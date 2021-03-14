import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ApiModelProperty({ example: '1st of May, 1960', nullable: false, maxLength: 255 })
  text: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({
    nullable: true,
    example: 'https://i.imgur.com/oygcF4w.jpeg',
    default: null,
  })
  url?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiModelProperty({ nullable: true, example: 1, minimum: 1 })
  order: number;
}
