import { OneOfQuestion } from '../entities/single-option-question.entity';
import { ManyOfQuestion } from '../entities/multi-option-question.entity';
import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';

export class CreateQuestionBulkResultDto {
  oneOfQuestions?: Array<OneOfQuestion>;

  manyOfQuestions?: Array<ManyOfQuestion>;

  exactAnswerQuestions?: Array<ExactAnswerQuestion>;
}
