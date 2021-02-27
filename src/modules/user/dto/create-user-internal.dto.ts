import { CreateUserDto } from './create-user.dto';

export class CreateUserInternalDto extends CreateUserDto {
  password: string;
}
