import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderOptionDto } from '../../option/dto/create-order-option.dto';

export class CreateOrderQuestionDto {
  @ApiModelProperty({
    minLength: 3,
    maxLength: 255,
    example: 'Put the cars in the right order by the year they released',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @ApiModelProperty({ isArray: true, type: CreateOrderOptionDto, nullable: false })
  @IsArray()
  @Type(() => CreateOrderOptionDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  options: Array<CreateOrderOptionDto>;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, example: 3 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
