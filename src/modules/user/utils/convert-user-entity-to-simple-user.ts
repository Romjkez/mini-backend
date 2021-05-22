import { UserEntity } from '../user.entity';
import { SimpleUser } from '../models/simple-user.model';

export function convertUserEntityToSimpleUser(user: UserEntity): SimpleUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isPrivate: user.isPrivate,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    rating: user.rating,
    company: user.company,
    bannedAt: user.bannedAt,
    role: user.role,
  };
}
