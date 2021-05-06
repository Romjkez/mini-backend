import { UserEntity } from '../user.entity';
import { User } from '../models/user.model';

/**
 * Renamed by TypeORM fields
 */
export interface UserEntityRelations {
  finishedTests: number;
  finishedArticles: number;
  favoriteArticles: number;
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
    finishedArticles: user.finishedArticles,
    finishedTests: user.finishedTests,
    favoriteArticles: user.favoriteArticles,
    role: user.role,
  };
}
