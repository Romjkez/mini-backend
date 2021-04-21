import { ExactAnswerQuestionAnswerEntity } from '../entities/exact-answer-question-answer.entity';

export class CreateExactAnswerQuestionAnswerInternalDto {
  question: Partial<ExactAnswerQuestionAnswerEntity>;
  answer: string;
  isCorrect: boolean;
}
