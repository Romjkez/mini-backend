import { CreateOptionDto } from '../../option/dto/create-option.dto';
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
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';

export class CreateOneOfQuestionDto {
  @ApiModelProperty({ minLength: 3, maxLength: 255, example: 'Which company owns MINI brand?' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @ApiModelProperty({
    isArray: true, type: CreateOptionDto, nullable: false,
    example: [
      {
        'text': 'BMW',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/600px-BMW.svg.png',
        'isCorrect': true,
      },
      {
        'text': 'Rolls Royce',
        'url': 'https://lezebre.lu/images/detailed/70/17246-rolls-royce-logo-3.png',
        'isCorrect': false,
      },
      {
        'text': 'Mercedes-Benz',
        'url': 'https://cdn.designrush.com/uploads/inspiration_images/8725/990__1524250340_590_Mercedes-Benz%20Logo%20Wordmark.jpg',
        'isCorrect': false,
      },
    ],
  })
  @IsArray()
  @Type(() => CreateOptionDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  options: Array<CreateOptionDto>;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, example: 4 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
