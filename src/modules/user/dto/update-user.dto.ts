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

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  @ApiModelPropertyOptional()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  email: string;
}
