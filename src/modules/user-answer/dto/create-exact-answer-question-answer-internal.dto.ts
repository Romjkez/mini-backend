import { ExactAnswerQuestion } from '../../question/entities/exact-answer-question.entity';

export class CreateExactAnswerQuestionAnswerInternalDto {
  question: Partial<ExactAnswerQuestion>;
  answer: string;
  isCorrect: boolean;
}
