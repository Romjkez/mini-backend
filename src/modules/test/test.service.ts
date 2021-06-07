import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Test } from './test.entity';
import { CreateTestDto, CreateTestInternalDto } from './dto/create-test.dto';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleTest } from './models/simple-test.model';
import { GetManyTestsDto } from './dto/get-many-tests.dto';
import { TestRepository } from './test.repository';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';
import { UserRole } from '../user/models/user-role.enum';
import { FinishedTestService } from '../finished-test/finished-test.service';
import { JwtPayload } from '../auth/models/jwt-payload.model';
import { TagService } from '../tag/tag.service';
import { OneOfQuestionEntity } from '../question/entities/one-of-question.entity';
import { ManyOfQuestionEntity } from '../question/entities/many-of-question.entity';

@Injectable()
export class TestService {
  constructor(private readonly testRepo: TestRepository,
              private readonly finTestService: FinishedTestService,
              private readonly logger: Logger,
              private readonly tagService: TagService) {
    logger.setContext('TestService');
  }

  createOne(dto: CreateTestDto): Observable<Test> {
    return this.tagService.resolveByText(dto.tags)
      .pipe(
        map(tags => ({ ...dto, tags }) as CreateTestInternalDto),
        switchMap(async dto => this.testRepo.save(dto)),
        switchMap(async test => this.testRepo.findOne(test.id, {
          relations: ['oneOfQuestions', 'manyOfQuestions', 'exactAnswerQuestions', 'orderQuestions'],
        })),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyTestsDto & ExtractedJwtPayload): Observable<GetManyResponseDto<SimpleTest>> {
    return from(this.testRepo.getMany(dto))
      .pipe(
        switchMap(async res => {
          if (dto.jwtPayload.role === UserRole.EMPLOYEE && res[1] !== 0) {
            const searchResult = await this.finTestService.hasUserFinishedTests(
              dto.jwtPayload.sub, res[0].map(t => t.id));

            res[0] = setIsFinishedStatuses<SimpleTest>(res[0], searchResult);
          }
          return res;
        }),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        map(([result, count]) => {
          return {
            data: result,
            perPage: dto.perPage || DEFAULT_PER_PAGE,
            page: dto.page || DEFAULT_PAGE,
            totalItems: count,
          };
        }),
      );
  }

  // TODO add update method, restrict updating when there is at least 1 related finishedTest

  getById(id: number, payload?: JwtPayload): Observable<Test> {
    return from(this.testRepo.findOneOrFail(id, {
      relations: ['oneOfQuestions', 'manyOfQuestions', 'exactAnswerQuestions', 'orderQuestions', 'tags'],
    }))
      .pipe(
        /*map(test => {
          if (payload?.role !== UserRole.ADMIN) {
            return excludeOptionsCorrectStatus(test);
          }
          return test;
        }),*/
        switchMap(async res => {
          if (payload?.role === UserRole.EMPLOYEE) {
            const searchResult = await this.finTestService.hasUserFinishedTests(payload.sub, [res.id]);

            res = setIsFinishedStatuses<Test>([res], searchResult)[0];
          }
          return res;
        }),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          if (err?.name === 'EntityNotFound') {
            throw new NotFoundException(`Test with ID=${id} was not found`);
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }
}

function setIsFinishedStatuses<T extends { isFinished?, id }>(tests: Array<T>, finishedTestsIds: Array<number>)
  : Array<T> {
  if (finishedTestsIds.length === 0) {
    return tests.map(test => {
      test.isFinished = false;
      return test;
    });
  }
  return tests.map(test => {
    test.isFinished = finishedTestsIds.includes(test.id);
    return test;
  });

}

function excludeOptionsCorrectStatus(test: Test): Test {
  test.oneOfQuestions = test.oneOfQuestions.map(removeIsCorrect) as Array<OneOfQuestionEntity>;
  test.manyOfQuestions = test.manyOfQuestions.map(removeIsCorrect) as Array<ManyOfQuestionEntity>;
  return test;
}

function removeIsCorrect(q: OneOfQuestionEntity | ManyOfQuestionEntity): OneOfQuestionEntity | ManyOfQuestionEntity {
  q.options = q.options.map(opt => {
    delete opt.isCorrect;
    return opt;
  });
  return q;
}
