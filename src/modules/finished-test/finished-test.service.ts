import { FinishedTestRepository } from './finished-test.repository';
import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { from, Observable } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { DEFAULT_PER_PAGE, GetManyDto } from '../../common/dto/get-many.dto';
import { JwtPayload } from '../auth/models/jwt-payload.model';
import { calculateQueryOffset } from '../../common/utils';
import { FinishedTestSimple } from './models/finished-test-simple.model';

export const FINISHED_TEST_RELATIONS: Array<string> = [
  'oneOfQuestionAnswers', 'manyOfQuestionAnswers', 'orderQuestionAnswers',
  'exactAnswerQuestionAnswers', 'finishedBy', 'test',
];

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly userService: UserService,
              private readonly logger: Logger) {
    logger.setContext('FinishedTestService');
  }

  async createOne(dto: CreateFinishedTestInternalDto): Promise<Observable<FinishedTest>> {
    const finishedTestsCount = await this.finishedTestRepo.createQueryBuilder('finishedTest')
      .where('finishedTest.finishedBy=:id', { id: dto.finishedBy.id })
      .getCount();

    if (finishedTestsCount === 0) {
      return this.finishedTestRepo.saveAndSetRating(dto, this.userService, this.logger);
    } else {
      const answer = await this.finishedTestRepo.findOne({
        test: { id: dto.test.id },
        finishedBy: { id: dto.finishedBy.id },
      });
      if (answer) {
        throw new ForbiddenException('TEST_ALREADY_TAKEN');
      }

      return this.finishedTestRepo.saveAndUpdateRating(dto, this.userService, this.logger);
    }
  }

  getById(id: number): Observable<FinishedTest> {
    return from(this.finishedTestRepo.findOneOrFail(id, {
      relations: FINISHED_TEST_RELATIONS,
    }))
      .pipe(
        map(test => {
          delete test.finishedBy.password;
          return test;
        }),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }


  getFinishedTestsOfUser(dto: GetManyDto, jwtPayload?: JwtPayload): Observable<Array<FinishedTestSimple>> {
    return from(this.finishedTestRepo.createQueryBuilder('finishedTest')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .loadRelationCountAndMap('finishedTest.oneOfQuestionAnswers', 'finishedTest.oneOfQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.manyOfQuestionAnswers', 'finishedTest.manyOfQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.orderQuestionAnswers', 'finishedTest.orderQuestionAnswers')
      .loadRelationCountAndMap('finishedTest.exactAnswerQuestionAnswers', 'finishedTest.exactAnswerQuestionAnswers')
      .innerJoinAndSelect('finishedTest.finishedBy', 'finishedBy', 'finishedBy.id=:id', { id: jwtPayload.sub })
      .leftJoinAndSelect('finishedTest.test', 'test')
      .getMany(),
    ).pipe(
      map(res => {
        return res.map(fTest => {
          (fTest as unknown as FinishedTestSimple).finishedBy = fTest.finishedBy.id;
          return fTest as unknown as FinishedTestSimple;
        });
      }),
    );


  }

  async hasUserFinishedTests(userId: number, testIds: Array<number>): Promise<Array<number>> {
    return this.finishedTestRepo.createQueryBuilder('finishedTest')
      .select('finishedTest.id')
      .where('finishedTest.finishedBy=:user', { user: userId })
      .andWhere('finishedTest.test IN (:...test)', { test: testIds })
      .getMany()
      .then(res => res.map(finishedTest => finishedTest.id));
  }
}

