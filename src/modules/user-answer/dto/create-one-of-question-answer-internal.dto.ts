import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { Option } from '../../option/entities/option.entity';

export class CreateOneOfQuestionAnswerInternalDto {
  question: Partial<OneOfQuestionEntity>;
  answer: Partial<Option<OneOfQuestionEntity>>;
  isCorrect: boolean;
}
