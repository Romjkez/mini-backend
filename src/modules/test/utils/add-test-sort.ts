import { SelectQueryBuilder } from 'typeorm';
import { TestSortDto } from '../dto/test-sort.dto';
import { Test } from '../test.entity';

export function addTestSort(qb: SelectQueryBuilder<Test>,
                            sortOptions: TestSortDto,
                            entityName: string): SelectQueryBuilder<Test> {
  if (sortOptions.createdAt) {
    qb = qb.addOrderBy(`"${entityName}"."createdAt"`, sortOptions.createdAt);
  }

  if (sortOptions.updatedAt) {
    qb = qb.addOrderBy(`"${entityName}"."updatedAt"`, sortOptions.updatedAt);
  }

  if (sortOptions.isVisible) {
    qb = qb.addOrderBy(`"${entityName}"."isVisible"`, sortOptions.isVisible);
  }

  return qb;
}
