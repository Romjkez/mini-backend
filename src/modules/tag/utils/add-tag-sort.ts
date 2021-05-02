import { SelectQueryBuilder } from 'typeorm';
import { Tag } from '../tag.entity';
import { TagSortDto } from '../dto/tag-sort.dto';

export function addTagSort(qb: SelectQueryBuilder<Tag>,
                           sortOptions: TagSortDto,
                           entityName: string): SelectQueryBuilder<Tag> {
  if (sortOptions.text) {
    qb = qb.addOrderBy(`"${entityName}"."text"`, sortOptions.text);
  }

  return qb;
}
