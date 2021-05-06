import { Test } from '../../test/test.entity';
import { CreateOneOfQuestionAnswerInternalDto } from '../../user-answer/dto/create-one-of-question-answer-internal.dto';
import { CreateManyOfQuestionAnswerInternalDto } from '../../user-answer/dto/create-many-of-question-answer-internal.dto';
import { CreateOrderQuestionAnswerInternalDto } from '../../user-answer/dto/create-order-question-answer-internal.dto';
import { CreateExactAnswerQuestionAnswerInternalDto } from '../../user-answer/dto/create-exact-answer-question-answer-internal.dto';
import { UserEntity } from '../../user/user.entity';

export class CreateFinishedTestInternalDto {
  finishedBy: Partial<UserEntity>;
  test: Partial<Test>;
  oneOfQuestionAnswers: Array<Partial<CreateOneOfQuestionAnswerInternalDto>>;
  manyOfQuestionAnswers: Array<Partial<CreateManyOfQuestionAnswerInternalDto>>;
  orderQuestionAnswers: Array<Partial<CreateOrderQuestionAnswerInternalDto>>;
  exactAnswerQuestionAnswers: Array<Partial<CreateExactAnswerQuestionAnswerInternalDto>>;
  result: number;
  correctAnswers: number;
}
