import { Test } from '../../test/test.entity';
import { CreateFinishedTestDto } from '../dto/create-finished-test.dto';
import { CreateFinishedTestInternalDto } from '../dto/create-finished-test-internal.dto';
import { buildOneOfQuestionTestResult } from './build-one-of-question-test-result';
import { buildManyOfQuestionTestResult } from './build-many-of-question-test-result';
import { buildExactAnswerQuestionTestResult } from './build-exact-answer-question-test-result';
import { buildOrderQuestionTestResult } from './build-order-question-test-result';
import { calculateTestResult } from './calculate-test-result';

/**
 * Check if all questions were answered
 * @param test
 * @param dto
 */
export function convertTestResultToInternal(test: Test, dto: CreateFinishedTestDto)
  : CreateFinishedTestInternalDto | null {
  let testCompleted: boolean = true;
  const createFinishedTestInternalDto: CreateFinishedTestInternalDto = {
    finishedBy: { id: dto.finishedBy },
    result: 0,
    test: { id: test.id },
    oneOfQuestionAnswers: [],
    manyOfQuestionAnswers: [],
    orderQuestionAnswers: [],
    exactAnswerQuestionAnswers: [],
    correctAnswers: 0,
  };

  for (let i = 0; i < test.oneOfQuestions.length; i++) {
    // Check whether a question is answered
    const answerIndex = dto.oneOfQuestionAnswers.findIndex(answer => answer.question === test.oneOfQuestions[i].id);

    if (answerIndex === -1) {
      testCompleted = false;
      break;
    } else { // Build test result by checking if answer is correct
      createFinishedTestInternalDto.oneOfQuestionAnswers.push(
        buildOneOfQuestionTestResult(dto.oneOfQuestionAnswers[answerIndex], test.oneOfQuestions[i]),
      );
    }
  }

  if (testCompleted !== false) {

    for (let i = 0; i < test.manyOfQuestions.length; i++) {
      const answerIndex = dto.manyOfQuestionAnswers.findIndex(answer => answer.question === test.manyOfQuestions[i].id);

      if (answerIndex === -1) {
        testCompleted = false;
        break;
      } else {
        createFinishedTestInternalDto.manyOfQuestionAnswers.push(
          buildManyOfQuestionTestResult(dto.manyOfQuestionAnswers[answerIndex], test.manyOfQuestions[i]),
        );
      }
    }
  }

  if (testCompleted !== false) {

    for (let i = 0; i < test.exactAnswerQuestions.length; i++) {
      const answerIndex = dto.exactAnswerQuestionAnswers
        .findIndex(answer => answer.question === test.exactAnswerQuestions[i].id);

      if (answerIndex === -1) {
        testCompleted = false;
        break;
      } else {
        createFinishedTestInternalDto.exactAnswerQuestionAnswers.push(
          buildExactAnswerQuestionTestResult(dto.exactAnswerQuestionAnswers[answerIndex], test.exactAnswerQuestions[i]),
        );
      }
    }
  }

  if (testCompleted !== false) {

    for (let i = 0; i < test.orderQuestions.length; i++) {
      const answerIndex = dto.orderQuestionAnswers.findIndex(answer => answer.question === test.orderQuestions[i].id);

      if (answerIndex === -1) {
        testCompleted = false;
        break;
      } else {
        createFinishedTestInternalDto.orderQuestionAnswers.push(
          buildOrderQuestionTestResult(dto.orderQuestionAnswers[answerIndex], test.orderQuestions[i]),
        );
      }
    }
  }

  if (testCompleted !== false) {
    const { correctAnswers, result } = calculateTestResult(createFinishedTestInternalDto);
    createFinishedTestInternalDto.result = result;
    createFinishedTestInternalDto.correctAnswers = correctAnswers;
  }

  return testCompleted ? createFinishedTestInternalDto : null;
}
