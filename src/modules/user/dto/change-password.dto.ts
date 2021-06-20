import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 6;

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiModelProperty({example: '444555', nullable: false})
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH)
  @ApiModelProperty({example: 'qwerty123!', nullable: false})
  newPassword: string;
}
