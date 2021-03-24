import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { SortType } from '../../../common/models/sort-type.enum';

export class UserSortDto {
  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'First name', enum: Object.keys(SortType) })
  firstName?: SortType;

  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Last name', enum: Object.keys(SortType) })
  lastName?: SortType;

  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Email', enum: Object.keys(SortType) })
  email?: SortType;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortType)
  @ApiModelPropertyOptional({ description: 'Employer of user', enum: Object.keys(SortType) })
  company?: SortType;

  @IsOptional()
  @IsEnum(SortType)
  @IsNotEmpty()
  @ApiModelPropertyOptional({
    description: 'If user prefers to hide profile from users rating',
    enum: Object.keys(SortType),
  })
  isPrivate?: SortType;

  @ApiModelPropertyOptional({ description: 'Average test score', enum: Object.keys(SortType) })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortType)
  rating?: SortType;
}
