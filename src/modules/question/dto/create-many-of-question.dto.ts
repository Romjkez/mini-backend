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

export class CreateManyOfQuestionDto {
  @ApiModelProperty({ minLength: 3, maxLength: 255, example: 'Which cars were designed in MINI?' })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @ApiModelProperty({ isArray: true, type: CreateOptionDto, nullable: false })
  @IsArray()
  @Type(() => CreateOptionDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  options: Array<CreateOptionDto>;

  @ApiModelProperty({ type: CreateOptionDto, nullable: false })
  @IsArray()
  @Type(() => CreateOptionDto)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  answer: Array<CreateOptionDto>;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
