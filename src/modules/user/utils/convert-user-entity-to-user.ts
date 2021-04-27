import { UserEntity } from '../user.entity';
import { User } from '../models/user.model';

/**
 * Renamed by TypeORM fields
 */
export interface UserEntityRelations {
  finishedTests: number;
  __finishedArticles__: number;
  __favoriteArticles__: number;
}

export function convertUserEntityToUser(user: UserEntity & UserEntityRelations): User {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    company: user?.company,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isPrivate: user.isPrivate,
    bannedAt: user.bannedAt,
    rating: user.rating,
    finishedArticles: user.__finishedArticles__,
    finishedTests: user.finishedTests,
    favoriteArticles: user.__favoriteArticles__,
    role: user.role,
  };
}
