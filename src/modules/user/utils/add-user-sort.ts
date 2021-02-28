import { SelectQueryBuilder } from 'typeorm';
import { UserSortDto } from '../dto/user-sort.dto';
import { UserEntity } from '../user.entity';

export function addUserSort(qb: SelectQueryBuilder<UserEntity>, sortOptions: UserSortDto, entityName: string)
  : SelectQueryBuilder<UserEntity> {
  if (sortOptions.company) {
    qb = qb.addOrderBy(`"${entityName}".company`, sortOptions.company);
  }
  return qb;
}
