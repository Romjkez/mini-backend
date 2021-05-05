import { FinishedTestRepository } from './finished-test.repository';
import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { from, Observable, of, zip } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

const FINISHED_TEST_RELATIONS: Array<string> = [
  'oneOfQuestionAnswers', 'manyOfQuestionAnswers', 'orderQuestionAnswers',
  'exactAnswerQuestionAnswers', 'finishedBy', 'test',
];

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly logger: Logger,
              private readonly userService: UserService) {
    logger.setContext('FinishedTestService');
  }

  async createOne(dto: CreateFinishedTestInternalDto): Promise<Observable<FinishedTest>> {
    const finishedTestsCount = await this.finishedTestRepo.createQueryBuilder('finishedTest')
      .where('finishedTest.finishedBy=:id', { id: dto.finishedBy.id })
      .getCount();

    if (finishedTestsCount === 0) {
      console.log(JSON.stringify(dto, null, 2));
      return from(this.finishedTestRepo.save(dto))
        .pipe(
          switchMap(res => zip(of(res), this.userService.updateRating(dto.finishedBy.id, dto.result))),
          switchMap(([finishedTest]) => from(this.finishedTestRepo.findOne(finishedTest.id, {
            relations: FINISHED_TEST_RELATIONS,
          }))),
          catchError(err => {
            console.error(err);
            this.logger.error(JSON.stringify(err, null, 2));
            throw new InternalServerErrorException(err);
          }),
        );

    } else {
      const answer = await this.finishedTestRepo.findOne({
        test: { id: dto.test.id },
        finishedBy: { id: dto.finishedBy.id },
      });
      if (answer) {
        throw new ForbiddenException('TEST_ALREADY_TAKEN');
      }
      const userAnswers = await this.finishedTestRepo.createQueryBuilder('finishedTest')
        .select('finishedTest.correctAnswers')
        .loadRelationCountAndMap('finishedTest.oneOfQuestionAnswers', 'finishedTest.oneOfQuestionAnswers')
        .loadRelationCountAndMap('finishedTest.manyOfQuestionAnswers', 'finishedTest.manyOfQuestionAnswers')
        .loadRelationCountAndMap('finishedTest.orderQuestionAnswers', 'finishedTest.orderQuestionAnswers')
        .loadRelationCountAndMap('finishedTest.exactAnswerQuestionAnswers', 'finishedTest.exactAnswerQuestionAnswers')
        .getMany();
      console.log(JSON.stringify(userAnswers, null, 2));
      console.log('FINISHED !=0');
    }
  }

  getById(id: number): Observable<FinishedTest> {
    return from(this.finishedTestRepo.findOneOrFail(id, {
      relations: FINISHED_TEST_RELATIONS,
    }))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}

