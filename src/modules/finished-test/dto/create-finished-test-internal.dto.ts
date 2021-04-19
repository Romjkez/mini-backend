import { User } from '../../user/models/user.model';
import { Test } from '../../test/test.entity';
import { CreateAnswerInternalDto } from '../../user-answer/dto/create-answer-internal.dto';

export class CreateFinishedTestInternalDto {
  user: Partial<User>;
  test: Partial<Test>;
  answers: Partial<CreateAnswerInternalDto>;
  result: number;
}
