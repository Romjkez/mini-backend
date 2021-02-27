import { User } from '../user.entity';
import { SimpleUser } from '../models/simple-user.model';

export function convertUserToSimpleUser(user: User): SimpleUser {
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
  };
}
