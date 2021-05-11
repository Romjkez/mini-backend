import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Test } from './test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { convertCreateTestDtoToInternal } from './utils/convert-create-test-dto-to-internal';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleTest } from './models/simple-test.model';
import { GetManyTestsDto } from './dto/get-many-tests.dto';
import { TestRepository } from './test.repository';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';
import { UserRole } from '../user/models/user-role.enum';
import { FinishedTestService } from '../finished-test/finished-test.service';
import { JwtPayload } from '../auth/models/jwt-payload.model';

@Injectable()
export class TestService {
  constructor(private readonly testRepo: TestRepository,
              private readonly finTestService: FinishedTestService,
              private readonly logger: Logger) {
    logger.setContext('TestService');
  }

  createOne(dto: CreateTestDto): Observable<Test> {
    return from(this.testRepo.save(convertCreateTestDtoToInternal(dto)))
      .pipe(
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
          if (dto.jwtPayload.role === UserRole.EMPLOYEE) {
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
      relations: ['oneOfQuestions', 'manyOfQuestions', 'exactAnswerQuestions', 'orderQuestions'],
    }))
      .pipe(
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
