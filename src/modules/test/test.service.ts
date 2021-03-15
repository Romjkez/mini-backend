import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TestService {
  constructor(@InjectRepository(Test) private readonly testRepo: Repository<Test>,
              private readonly logger: Logger) {
    logger.setContext('TestService');
  }

  createOne(dto: CreateTestDto): Observable<Test> {
    return from(this.testRepo.save(dto))
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

  getById(id: number): Observable<Test> {
    return from(this.testRepo.findOneOrFail(id, {
      relations: ['oneOfQuestions', 'manyOfQuestions', 'exactAnswerQuestions', 'orderQuestions'],
    }))
      .pipe(
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
