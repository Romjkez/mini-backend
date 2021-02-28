import { SelectQueryBuilder } from 'typeorm';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserEntity } from '../user.entity';

export function addUserFilter(qb: SelectQueryBuilder<UserEntity>, filter: UserFilterDto, entityName: string)
  : SelectQueryBuilder<UserEntity> {

  if (filter.email) {
    qb = qb.andWhere(`"${entityName}".email ILIKE :email`, { email: `%${filter.email}%` });
  }

  return qb;
}
