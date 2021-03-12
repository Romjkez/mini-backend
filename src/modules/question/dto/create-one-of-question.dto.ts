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
  @ApiModelProperty({ minLength: 3, maxLength: 255, example: 'When the MINI was founded?' })
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
  options: Array<CreateOptionDto> | Array<number>;

  @ApiModelProperty({ type: CreateOptionDto, nullable: false })
  @Type(() => CreateOptionDto)
  @IsNotEmpty()
  answer: CreateOptionDto | number;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
