import { ArticleEntity } from '../article.entity';
import { ArticleFilterDto } from '../dto/article-filter.dto';
import { SelectQueryBuilder } from 'typeorm';

export function addArticleFilter(qb: SelectQueryBuilder<ArticleEntity>, filter: ArticleFilterDto, entityName: string)
  : SelectQueryBuilder<ArticleEntity> {

  if (filter.title) {
    qb = qb.andWhere(`"${entityName}"."title" ILIKE :title`, { title: `%${filter.title}%` });
  }

  if (filter.isInExercise === true) {
    qb = qb.andWhere(`"${entityName}"."order" IS NOT NULL`);
  }

  if (filter.isInExercise === false) {
    qb = qb.andWhere(`"${entityName}"."order" IS NULL`);
  }


  return qb;
}
