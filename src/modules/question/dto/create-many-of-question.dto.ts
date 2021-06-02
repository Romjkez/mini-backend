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
import { CreateOptionDto } from '../../option/dto/create-option.dto';
import { Type } from 'class-transformer';
import { HasCorrectAnswer } from '../../test/decorators/has-correct-answer';

export class CreateManyOfQuestionDto {
  @ApiModelProperty({ minLength: 3, maxLength: 255, example: 'Which cars were designed by MINI?' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @ApiModelProperty({
    isArray: true, type: CreateOptionDto, nullable: false,
    example: [
      {
        'text': '3 door',
        'url': 'https://mediapool.bmwgroup.com/cache/P9/201402/P90142935/P90142935-mini-cooper-02-2014-2250px.jpg',
        'isCorrect': true,
      },
      {
        'text': 'Clubman',
        'url': 'https://www.carpixel.net/w/a67489c16b07fcc0de1908500821f9c9/mini-cooper-clubman-wallpaper-hd-37378.jpg',
        'isCorrect': true,
      },
      {
        'text': 'M3',
        'url': 'https://www.avtorinok.ru/photo/pics/bmw/m3-f80/123528.jpg',
        'isCorrect': false,
      },
    ],
  })
  @IsArray()
  @Type(() => CreateOptionDto)
  @ValidateNested({ each: true })
  @HasCorrectAnswer()
  @IsNotEmpty()
  options: Array<CreateOptionDto>;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
