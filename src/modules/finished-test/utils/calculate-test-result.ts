import { CreateFinishedTestInternalDto } from '../dto/create-finished-test-internal.dto';

export const USER_RATING_PRECISION: number = 3;

/**
 * Calculate final test score with 3 symbols precision (after the comma)
 * @param dto
 */
export function calculateTestResult(dto: CreateFinishedTestInternalDto): TestResult {
  const oneOfQuestionCorrectAnswers = dto.oneOfQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const manyOfQuestionCorrectAnswers = dto.manyOfQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const exactAnswerQuestionCorrectAnswers = dto.exactAnswerQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const orderQuestionCorrectAnswers = dto.orderQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);

  const correctAnswers = oneOfQuestionCorrectAnswers + manyOfQuestionCorrectAnswers +
    exactAnswerQuestionCorrectAnswers + orderQuestionCorrectAnswers;
  return {
    correctAnswers,
    result: +(correctAnswers /
      (dto.oneOfQuestionAnswers.length + dto.manyOfQuestionAnswers.length +
        dto.exactAnswerQuestionAnswers.length + dto.orderQuestionAnswers.length)).toFixed(USER_RATING_PRECISION),
  };
}

export interface TestResult {
  /**
   * Number of correct answers
   */
  correctAnswers: number;
  /**
   * Float score (from 0 to 1)
   */
  result: number;
}
