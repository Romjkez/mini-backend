import { GetManyDto } from '../../../common/dto/get-many.dto';
import { TagSortDto } from './tag-sort.dto';
import { TagFilterDto } from './tag-filter.dto';
import { ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';

export class GetManyTagsDto extends GetManyDto {
  @ValidateNested()
  @Type(() => TagSortDto)
  @ApiModelPropertyOptional({ type: TagSortDto })
  sort?: TagSortDto;

  @ValidateNested()
  @Type(() => TagFilterDto)
  @ApiModelPropertyOptional({ type: TagFilterDto })
  filter?: TagFilterDto;
}
