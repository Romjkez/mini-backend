import { Tag } from '../../tag/tag.entity';

export class ArticleRelationsInfo {
  favoriteFor: number;
  finishedBy: number;
  tags: Array<Tag>;
}
