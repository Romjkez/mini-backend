import { SelectQueryBuilder } from 'typeorm';
import { NewsEntity } from '../news.entity';
import { NewsSortDto } from '../dto/news-sort.dto';

export function addNewsSort(qb: SelectQueryBuilder<NewsEntity>,
                            sortOptions: NewsSortDto,
                            entityName: string): SelectQueryBuilder<NewsEntity> {
  if (sortOptions.createdAt) {
    qb = qb.addOrderBy(`"${entityName}"."createdAt"`, sortOptions.createdAt);
  }

  if (sortOptions.updatedAt) {
    qb = qb.addOrderBy(`"${entityName}"."updatedAt"`, sortOptions.updatedAt);
  }

  return qb;
}
