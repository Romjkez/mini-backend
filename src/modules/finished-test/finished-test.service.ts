import { FinishedTestRepository } from './finished-test.repository';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { from, Observable, of, zip } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { catchError, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { ExactAnswerQuestionAnswerEntity } from '../user-answer/entities/exact-answer-question-answer.entity';
import { OneOfQuestionAnswerEntity } from '../user-answer/entities/one-of-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from '../user-answer/entities/many-of-question-answer.entity';
import { OrderQuestionAnswerEntity } from '../user-answer/entities/order-question-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
          switchMap(res => {
            const exact =
              dto.exactAnswerQuestionAnswers.map(answer => Object.assign(answer, { finishedTest: { id: res.id } }));
            const order =
              dto.orderQuestionAnswers.map(answer => Object.assign(answer, { finishedTest: { id: res.id } }));
            const oneOf =
              dto.oneOfQuestionAnswers.map(answer => Object.assign(answer, { finishedTest: { id: res.id } }));
            const manyOf =
              dto.manyOfQuestionAnswers.map(answer => Object.assign(answer, { finishedTest: { id: res.id } }));
            console.log(JSON.stringify(manyOf));
            return zip(
              of(res),
              from(this.oneOfAnswerQRepo.save(oneOf)),
              from(this.manyOfAnswerQRepo.save(manyOf)),
              from(this.orderAnswerQRepo.save(order)),
              from(this.exactAnswerQRepo.save(exact)),
            );
          }),
          switchMap(res => from(this.finishedTestRepo.findOne(res[0].id, {
            relations: [
              'oneOfQuestionAnswers', 'manyOfQuestionAnswers', 'orderQuestionAnswers',
              'exactAnswerQuestionAnswer', 'finishedBy', 'test',
            ],
          }))),
          catchError(err => {
            console.error(err);
            this.logger.error(JSON.stringify(err, null, 2));
            throw new InternalServerErrorException(err);
          }),
        );
      /*
            this.finishedTestRepo.save(dto)
              .then(async res => {
                return Promise.all([
                  this.exactAnswerQRepo.save(Object.assign(dto.exactAnswerQuestionAnswers, { finishedTest: res.id })),
                  this.orderAnswerQRepo.save(Object.assign(dto.orderQuestionAnswers, { finishedTest: res.id })),
                  this.oneOfAnswerQRepo.save(Object.assign(dto.oneOfQuestionAnswers, { finishedTest: res.id })),
                  this.manyOfAnswerQRepo.save(Object.assign(dto.manyOfQuestionAnswers, { finishedTest: res.id })),
                ]);
              })
              .catch(err => {
                console.error(err);
                this.logger.error(JSON.stringify(err, null, 2));
                throw new InternalServerErrorException(err);
              });*/

    } else {
      console.log('FINISHED !=0');
    }
  }

  getById(id: number): Observable<FinishedTest> {
    return from(this.finishedTestRepo.findOneOrFail(id, {
      relations: ['finishedBy', 'oneOfQuestionAnswers', 'manyOfQuestionAnswers',
        'orderQuestionAnswers', 'exactAnswerQuestionAnswer', 'test'],
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

