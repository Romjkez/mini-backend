import { UserEntity } from '../user.entity';
import { Article } from '../../article/article.entity';
import { User } from '../models/user.model';
import { FinishedTest } from '../../finished-test/finished-test.entity';

/**
 * Renamed by TypeORM fields
 */
export interface UserEntityRelations {
  __finishedTests__: Array<FinishedTest>;
  __finishedArticles__: Array<Article>
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
    finishedTests: user.__finishedTests__,
    role: user.role,
  };
}
