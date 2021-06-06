import { SelectQueryBuilder } from 'typeorm';
import { Tag } from '../tag.entity';
import { TagFilterDto } from '../dto/tag-filter.dto';

export function addTagFilter(qb: SelectQueryBuilder<Tag>, filter: TagFilterDto, entityName: string)
  : SelectQueryBuilder<Tag> {

  if (filter.text) {
    qb = qb.andWhere(`"${entityName}"."text" ILIKE :text`, { text: `%${filter.text}%` });
  }

  return qb;
}
