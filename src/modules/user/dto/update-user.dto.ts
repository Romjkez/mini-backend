import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelPropertyOptional({example: 'John', nullable: false, description: 'First name'})
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  @ApiModelPropertyOptional({example: 'Doe', nullable: false, description: 'Last name'})
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelPropertyOptional({example: 'john@doe.com', nullable: false, description: 'Email'})
  email?: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({example: 'Avilon NY', description: 'User employment company'})
  company?: string;
}
