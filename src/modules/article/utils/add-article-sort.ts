import { ArticleSortDto } from '../dto/article-sort.dto';
import { SelectQueryBuilder } from 'typeorm';
import { ArticleEntity } from '../article.entity';


export function addArticleSort(qb: SelectQueryBuilder<ArticleEntity>,
                               sortOptions: ArticleSortDto,
                               entityName: string): SelectQueryBuilder<ArticleEntity> {
  if (sortOptions.createdAt) {
    qb = qb.addOrderBy(`"${entityName}"."createdAt"`, sortOptions.createdAt);
  }

  if (sortOptions.updatedAt) {
    qb = qb.addOrderBy(`"${entityName}"."updatedAt"`, sortOptions.updatedAt);
  }

  return qb;
}
