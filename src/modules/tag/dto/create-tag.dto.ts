import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @ApiModelProperty({ nullable: false, example: 'Clubman', minLength: 2, maxLength: 20 })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  text: string;
}
