import { EntityRepository, Repository } from 'typeorm';
import { FinishedTest } from './finished-test.entity';
import { from, Observable, of, zip } from 'rxjs';
import { FinishedTestAnswers } from './models/finished-test-answers.model';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { FINISHED_TEST_RELATIONS } from './finished-test.service';
import { UserService } from '../user/user.service';
import { USER_RATING_PRECISION } from './utils/calculate-test-result';

@EntityRepository(FinishedTest)
export class FinishedTestRepository extends Repository<FinishedTest> {

  getUserAnswers(id: number): Observable<Array<FinishedTestAnswers>> {
    return from(this.createQueryBuilder('finishedTest')
      .select('finishedTest.correctAnswers')
      .where('finishedTest.finishedBy=:id', { id })
      .loadRelationCountAndMap('finishedTest.oneOfQuestionAnswers', 'finishedTest.oneOfQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.manyOfQuestionAnswers', 'finishedTest.manyOfQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.orderQuestionAnswers', 'finishedTest.orderQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.exactAnswerQuestionAnswers', 'finishedTest.exactAnswerQuestionAnswers')
      .getMany()) as unknown as Observable<Array<FinishedTestAnswers>>;
  }

  /**
   * Saves finished test and sets user rating
   * Notice: use this method to save user's first finished test as it completely replaces current user's 'rating' field
   * @param dto
   * @param userService
   * @param logger
   */
  async saveAndSetRating(dto: CreateFinishedTestInternalDto, userService: UserService, logger: Logger)
    : Promise<Observable<FinishedTest>> {
    return from(this.save(dto))
      .pipe(
        switchMap(res => zip(of(res), userService.updateRating(dto.finishedBy.id, dto.result))),
        switchMap(([finishedTest]) => from(this.findOne(finishedTest.id, {
          relations: FINISHED_TEST_RELATIONS,
        }))),
        catchError(err => {
          console.error(err);
          logger.error(err);
          throw new InternalServerErrorException(err);
        }),
      );
  }

  /**
   * Saves finished test and recalculates user rating
   * @param dto
   * @param userService
   * @param logger
   */
  async saveAndUpdateRating(dto: CreateFinishedTestInternalDto, userService: UserService, logger: Logger)
    : Promise<Observable<FinishedTest>> {
    return from(this.save(dto))
      .pipe(
        switchMap((finishedTest: FinishedTest) => zip(of(finishedTest), this.getUserAnswers(dto.finishedBy.id))),
        switchMap(([finishedTest, userAnswers]) => {
          const totalAnswers: number = userAnswers.reduce((acc: number, curr) => {
            acc += curr.manyOfQuestionAnswers + curr.oneOfQuestionAnswers +
              curr.exactAnswerQuestionAnswers + curr.orderQuestionAnswers;
            return acc;
          }, 0);
          const totalCorrectAnswers: number = userAnswers.reduce((acc, curr) => {
            acc += curr.correctAnswers;
            return acc;
          }, 0);
          const updatedUserRating = +(totalCorrectAnswers / totalAnswers).toFixed(USER_RATING_PRECISION);
          return from(userService.updateRating(dto.finishedBy.id, updatedUserRating))
            .pipe(
              catchError(err => {
                console.error(err);
                logger.error(err);
                throw new InternalServerErrorException(err);
              }),
              map(() => finishedTest),
            );
        }),
        switchMap((finishedTest) => from(this.findOne(finishedTest.id, {
          relations: FINISHED_TEST_RELATIONS,
        }))),
        catchError(err => {
          console.error(err);
          logger.error(err);
          throw new InternalServerErrorException(err);
        }),
      );
  }

}
