import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { MIN_FIRSTNAME_LENGTH, MIN_LASTNAME_LENGTH } from './create-user.dto';
import { Transform } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserRole } from '../models/user-role.enum';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  @MinLength(MIN_FIRSTNAME_LENGTH)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'First name', example: 'John' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(MIN_LASTNAME_LENGTH)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Last name', example: 'Doe' })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Email', example: 'john@doe.com' })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({ description: 'Employer of user', example: 'Avilon NY' })
  company?: string;

  @IsOptional()
  @Transform(Boolean)
  @IsBoolean()
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'If user prefers to hide profile from users rating' })
  isPrivate?: boolean;

  @IsOptional()
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'User role', enum: Object.keys(UserRole) })
  role?: UserRole;
}
