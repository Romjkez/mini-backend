import { Option } from '../../option/entities/option.entity';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';

export class CreateOrderQuestionAnswerInternalDto {
  question: Partial<OrderQuestionEntity>;
  answer: Array<Partial<Option<OrderQuestionEntity>>>;
  isCorrect: boolean;
}
