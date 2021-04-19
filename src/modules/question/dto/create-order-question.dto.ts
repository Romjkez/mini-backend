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

  @ApiModelProperty({
    isArray: true, type: CreateOrderOptionDto, nullable: false,
    example: [
      {
        'text': 'Clubman',
        'url': 'https://foothillsalesandleasing.com/wp-content/uploads/imgp/Mini-Clubman-1.6-2013-10-7038.jpg',
        'order': 2,
      },
      {
        'text': '5 door',
        'url': 'https://www.carpixel.net/w/30104b396b55be84c5f84c74bfd7e2e3/mini-cooper-s-5-door-wallpaper-hd-78475.jpg',
        'order': 3,
      },
      {
        'text': '3 door',
        'url': 'https://www.carpixel.net/w/a67489c16b07fcc0de1908500821f9c9/mini-cooper-clubman-wallpaper-hd-37378.jpg',
        'order': 1,
      },
    ],
  })
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
