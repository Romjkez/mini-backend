import { SelectQueryBuilder } from 'typeorm';
import { Test } from '../test.entity';
import { TestFilterDto } from '../dto/test-filter.dto';

export function addTestFilter(qb: SelectQueryBuilder<Test>, filter: TestFilterDto, entityName: string)
  : SelectQueryBuilder<Test> {

  if (typeof filter.isVisible === 'boolean') {
    qb = qb.andWhere(`"${entityName}"."isVisible"=:isVisible`, { isVisible: filter.isVisible });
  }

  if (filter.title) {
    qb = qb.andWhere(`"${entityName}"."title"=:title`, { title: filter.title });
  }

  return qb;
}
