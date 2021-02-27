import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelProperty({
    example: 'John',
    nullable: false,
    description: 'First name',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
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
    description: 'User employment company',
  })
  company?: string;
}
