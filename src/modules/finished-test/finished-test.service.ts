import { FinishedTestRepository } from './finished-test.repository';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { from, Observable } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { catchError, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { ExactAnswerQuestionAnswerEntity } from '../user-answer/entities/exact-answer-question-answer.entity';
import { OneOfQuestionAnswerEntity } from '../user-answer/entities/one-of-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from '../user-answer/entities/many-of-question-answer.entity';
import { OrderQuestionAnswerEntity } from '../user-answer/entities/order-question-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

const FINISHED_TEST_RELATIONS: Array<string> = [
  'oneOfQuestionAnswers', 'manyOfQuestionAnswers', 'orderQuestionAnswers',
  'exactAnswerQuestionAnswer', 'finishedBy', 'test',
];

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly logger: Logger,
              @InjectRepository(OneOfQuestionAnswerEntity)
              private readonly oneOfAnswerQRepo: Repository<OneOfQuestionAnswerEntity>,
              @InjectRepository(ManyOfQuestionAnswerEntity)
              private readonly manyOfAnswerQRepo: Repository<ManyOfQuestionAnswerEntity>,
              @InjectRepository(OrderQuestionAnswerEntity)
              private readonly orderAnswerQRepo: Repository<OrderQuestionAnswerEntity>,
              @InjectRepository(ExactAnswerQuestionAnswerEntity)
              private readonly exactAnswerQRepo: Repository<ExactAnswerQuestionAnswerEntity>) {
    logger.setContext('FinishedTestService');
  }

  async createOne(dto: CreateFinishedTestInternalDto): Promise<Observable<FinishedTest>> {
    const finishedTestsCount = await this.finishedTestRepo.createQueryBuilder('finishedTest')
      .where('finishedTest.finishedBy=:id', { id: dto.finishedBy.id })
      .getCount();

    if (finishedTestsCount === 0) {
      console.log(0);

      return from(this.finishedTestRepo.save(dto))
        .pipe(
          switchMap(res => from(this.finishedTestRepo.findOne(res.id, {
            relations: FINISHED_TEST_RELATIONS,
          }))),
          catchError(err => {
            console.error(err);
            this.logger.error(JSON.stringify(err, null, 2));
            throw new InternalServerErrorException(err);
          }),
        );

    } else {
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

