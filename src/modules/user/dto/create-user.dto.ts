import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export const MIN_FIRSTNAME_LENGTH = 2;
export const MIN_LASTNAME_LENGTH = 2;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_FIRSTNAME_LENGTH)
  @ApiModelProperty({
    example: 'John',
    nullable: false,
    description: 'First name',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_LASTNAME_LENGTH)
  @ApiModelProperty({
    example: 'Doe',
    nullable: false,
    description: 'Last name',
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty({
    example: 'john@doe.com',
    nullable: false,
    description: 'Email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional({
    example: 'Avilon NY',
    description: 'Employer of user',
  })
  company?: string;
}
