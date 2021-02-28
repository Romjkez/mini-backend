import { SelectQueryBuilder } from 'typeorm';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserEntity } from '../user.entity';

export function addUserFilter(qb: SelectQueryBuilder<UserEntity>, filter: UserFilterDto, entityName: string)
  : SelectQueryBuilder<UserEntity> {

  if (filter.firstName) {
    qb = qb.andWhere(`"${entityName}"."firstName" ILIKE :firstName`, { firstName: `%${filter.firstName}%` });
  }

  if (filter.lastName) {
    qb = qb.andWhere(`"${entityName}"."lastName" ILIKE :lastName`, { lastName: `%${filter.lastName}%` });
  }

  if (filter.company) {
    qb = qb.andWhere(`"${entityName}"."company" ILIKE :company`, { company: `%${filter.company}%` });
  }

  if (filter.isPrivate) {
    qb = qb.andWhere(`"${entityName}"."isPrivate"=:isPrivate`, { isPrivate: filter.isPrivate });
  }

  if (filter.email) {
    qb = qb.andWhere(`"${entityName}"."email" ILIKE :email`, { email: `%${filter.email}%` });
  }

  if (filter.role) {
    qb = qb.andWhere(`"${entityName}"."role"=:role`, { role: filter.role });
  }

  return qb;
}
