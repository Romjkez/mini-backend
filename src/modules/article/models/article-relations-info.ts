import { Tag } from '../../tag/tag.entity';

export class ArticleRelationsInfo {
  __favoriteFor__: number;
  __has_favoriteFor__: boolean;
  __finishedBy__: number;
  __has_finishedBy__: boolean;
  __tags__: Array<Tag>; // TODO: check type
  __has_tags__: boolean;
}
