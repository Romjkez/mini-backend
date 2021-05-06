import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { SortType } from '../../../common/models/sort-type.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class ArticleSortDto {
  @ApiModelPropertyOptional({ enum: Object.keys(SortType) })
  @IsEnum(SortType)
  @IsNotEmpty()
  @IsOptional()
  createdAt?: SortType;

  @ApiModelPropertyOptional({ enum: Object.keys(SortType) })
  @IsEnum(SortType)
  @IsNotEmpty()
  @IsOptional()
  updatedAt: SortType;
}
