import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateUserDto {
  @ApiModelProperty({ example: 'john@doe.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({ example: 'qwerty123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
