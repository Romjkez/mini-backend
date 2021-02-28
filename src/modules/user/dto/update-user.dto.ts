import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelPropertyOptional({ example: 'John', nullable: false, description: 'First name' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelPropertyOptional({example: 'Doe', nullable: false, description: 'Last name'})
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @ApiModelPropertyOptional({ example: 'john@doe.com', nullable: false, description: 'Email' })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({ example: 'Avilon NY', description: 'User employment company' })
  company?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiModelPropertyOptional({ description: 'If user prefers to hide profile from users rating' })
  isPrivate?: boolean;
}
