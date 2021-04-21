import { Option } from '../../option/entities/option.entity';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { ManyOfQuestionAnswerEntity } from '../entities/many-of-question-answer.entity';

export class CreateManyOfQuestionAnswerInternalDto {
  question: Partial<ManyOfQuestionEntity>;
  answer: Array<Partial<Option<ManyOfQuestionAnswerEntity>>>;
  isCorrect: boolean;
}
