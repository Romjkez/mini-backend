import { CreateUserDto } from '../user/dto/create-user.dto';

export const USER_SEED_DATA: CreateUserDto = {
  firstName: 'Администратор',
  lastName: 'MINI',
  email: process.env.ADMIN_EMAIL,
};
