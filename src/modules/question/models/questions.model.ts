import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';
import { OrderQuestion } from './order-question.model';
import { OneOfQuestion } from './one-of-question.model';
import { ManyOfQuestion } from './many-of-question.model';

export class Questions {
  oneOfQuestions?: Array<OneOfQuestion>;

  manyOfQuestions?: Array<ManyOfQuestion>;

  exactAnswerQuestions?: Array<ExactAnswerQuestion>;

  orderQuestions?: Array<OrderQuestion>;
}
