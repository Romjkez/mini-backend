import {
  ApiModelProperty,
  ApiModelPropertyOptional
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiModelProperty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  @ApiModelPropertyOptional()
  lastName?: string

  @IsNotEmpty()
  @IsEmail()
  @ApiModelProperty()
  email: string
}
