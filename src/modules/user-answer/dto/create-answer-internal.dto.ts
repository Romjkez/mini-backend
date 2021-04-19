import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';
import { Option } from '../../option/entities/option.entity';

export class CreateAnswerInternalDto {
  question: Partial<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>;
  answer: Array<Partial<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>>>;
  isCorrect: boolean;
}
