import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SortType } from '../../../common/models/sort-type.enum';

export class TestSortDto {
  @ApiModelPropertyOptional({ type: 'string', enum: Object.values(SortType) })
  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  isVisible?: SortType;

  @ApiModelPropertyOptional({ type: 'string', enum: Object.values(SortType) })
  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  createdAt?: SortType;

  @ApiModelPropertyOptional({ type: 'string', enum: Object.values(SortType) })
  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  updatedAt?: SortType;
}
