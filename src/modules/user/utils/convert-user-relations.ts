import { User } from '../user.entity';
import { Article } from '../../article/article.entity';
import { Test } from '../../test/test.entity';
import { ConvertedUser } from '../models/converted-user.model';

interface ArticlesTestsRelations {
  __finishedTests__: Array<Test>;
  __finishedArticles__: Array<Article>;
}

export function convertUserRelations(user: User & ArticlesTestsRelations): ConvertedUser {
  return {
    ...user,
    finishedArticles: user.__finishedArticles__,
    finishedTests: user.__finishedTests__,
  };
}
