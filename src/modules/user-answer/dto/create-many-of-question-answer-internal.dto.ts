import { Option } from '../../option/entities/option.entity';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';

export class CreateManyOfQuestionAnswerInternalDto {
  question: Partial<ManyOfQuestionEntity>;
  answer: Array<Partial<Option<ManyOfQuestionEntity>>>;
  isCorrect: boolean;
}
