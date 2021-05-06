import { FinishedTestRepository } from './finished-test.repository';
import { ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { from, Observable } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user/user.service';

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
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}

