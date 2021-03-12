import { OneOfQuestion } from '../entities/one-of-question.entity';
import { ManyOfQuestion } from '../entities/many-of-question.entity';
import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';

export class Questions {
  oneOfQuestions?: Array<OneOfQuestion>;

  manyOfQuestions?: Array<ManyOfQuestion>;

  exactAnswerQuestions?: Array<ExactAnswerQuestion>;
}
