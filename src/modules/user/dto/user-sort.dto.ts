import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { MIN_FIRSTNAME_LENGTH, MIN_LASTNAME_LENGTH } from './create-user.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Transform } from 'class-transformer';
import { SortType } from '../../../common/models/sort-type.enum';

export class UserSortDto {
  @IsOptional()
  @IsString()
  @MinLength(MIN_FIRSTNAME_LENGTH)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'First name', enum: Object.keys(SortType) })
  firstName?: SortType;

  @IsOptional()
  @IsString()
  @MinLength(MIN_LASTNAME_LENGTH)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Last name', enum: Object.keys(SortType) })
  lastName?: SortType;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Email', enum: Object.keys(SortType) })
  email?: SortType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({ description: 'Employer of user', enum: Object.keys(SortType) })
  company?: SortType;

  @IsOptional()
  @Transform(Boolean)
  @IsBoolean()
  @IsNotEmpty()
  @ApiModelPropertyOptional({
    description: 'If user prefers to hide profile from users rating',
    enum: Object.keys(SortType),
  })
  isPrivate?: SortType;

  @ApiModelPropertyOptional({ description: 'Average test score', enum: Object.keys(SortType) })
  rating?: SortType;
}
