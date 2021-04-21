import { FinishedTestRepository } from './finished-test.repository';
import { CreateFinishedTestDto } from './dto/create-finished-test.dto';
import { from } from 'rxjs';
import { TestService } from '../test/test.service';
import { filter, tap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { Test } from '../test/test.entity';
import { CreateOneOfQuestionAnswerDto } from '../user-answer/dto/create-one-of-question-answer.dto';

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly testService: TestService) {
  }

  createOne(dto: CreateFinishedTestDto) {
    return from(this.testService.getById(dto.test))
      .pipe(
        filter(test => testIsCompleted(test, dto.answers)),
        tap(test => {
          console.log('All answered');
          // TODO: покрыть кейс с user-answer для вопроса с точным ответом
        }),
      );
  }
}

/**
 * Check if all questions were answered
 * @param test
 * @param answers
 */
function testIsCompleted(test: Test, answers: Array<CreateOneOfQuestionAnswerDto>): boolean {
  return [...test.manyOfQuestions, ...test.oneOfQuestions, ...test.exactAnswerQuestions, ...test.orderQuestions]
    .every(question => answers.some(answer => answer.question === question.id));
}
