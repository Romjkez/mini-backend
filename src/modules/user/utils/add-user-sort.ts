import { SelectQueryBuilder } from 'typeorm';
import { UserSortDto } from '../dto/user-sort.dto';
import { UserEntity } from '../user.entity';

export function addUserSort(qb: SelectQueryBuilder<UserEntity>, sortOptions: UserSortDto, entityName: string)
  : SelectQueryBuilder<UserEntity> {
  if (sortOptions.firstName) {
    qb = qb.addOrderBy(`"${entityName}"."firstName"`, sortOptions.firstName);
  }

  if (sortOptions.lastName) {
    qb = qb.addOrderBy(`"${entityName}"."lastName"`, sortOptions.lastName);
  }

  if (sortOptions.email) {
    qb = qb.addOrderBy(`"${entityName}"."email"`, sortOptions.email);
  }

  if (sortOptions.isPrivate) {
    qb = qb.addOrderBy(`"${entityName}"."isPrivate"`, sortOptions.isPrivate);
  }

  if (sortOptions.company) {
    qb = qb.addOrderBy(`"${entityName}"."company"`, sortOptions.company);
  }

  if (sortOptions.rating) {
    qb = qb.addOrderBy(`"${entityName}"."rating"`, sortOptions.rating);
  }

  return qb;
}
