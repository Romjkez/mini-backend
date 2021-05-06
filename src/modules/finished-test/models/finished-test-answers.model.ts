import { FinishedTest } from '../finished-test.entity';

/**
 * Type representing correct and total answers of finished test
 */
export type FinishedTestAnswers = Pick<FinishedTest, 'correctAnswers'> & FinishedTestTotalAnswers;

interface FinishedTestTotalAnswers {
  oneOfQuestionAnswers: number
  manyOfQuestionAnswers: number
  orderQuestionAnswers: number
  exactAnswerQuestionAnswers: number
}
