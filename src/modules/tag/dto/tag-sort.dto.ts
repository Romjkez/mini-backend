import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SortType } from '../../../common/models/sort-type.enum';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class TagSortDto {
  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Tag content', enum: Object.keys(SortType) })
  text?: SortType;
}
