import { CreateFinishedTestInternalDto } from '../dto/create-finished-test-internal.dto';

/**
 * Calculate final test score with 2 symbols precision (after the comma)
 * @param dto
 */
export function calculateTestResult(dto: CreateFinishedTestInternalDto): number {
  const oneOfQuestionCorrectAnswers = dto.oneOfQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const manyOfQuestionCorrectAnswers = dto.manyOfQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const exactAnswerQuestionCorrectAnswers = dto.exactAnswerQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);
  const orderQuestionCorrectAnswers = dto.orderQuestionAnswers.reduce((acc, curr) =>
    curr.isCorrect ? acc += 1 : acc, 0);

  return +((oneOfQuestionCorrectAnswers + manyOfQuestionCorrectAnswers +
    exactAnswerQuestionCorrectAnswers + orderQuestionCorrectAnswers) /
    (dto.oneOfQuestionAnswers.length + dto.manyOfQuestionAnswers.length +
      dto.exactAnswerQuestionAnswers.length + dto.orderQuestionAnswers.length)).toFixed(2);
}
