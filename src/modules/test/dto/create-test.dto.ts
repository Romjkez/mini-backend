import { Type } from 'class-transformer';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionBulkDto } from '../../question/dto/create-question-bulk.dto';
import { CreateOneOfQuestionDto } from '../../question/dto/create-one-of-question.dto';
import { CreateManyOfQuestionDto } from '../../question/dto/create-many-of-question.dto';
import { CreateExactAnswerQuestionDto } from '../../question/dto/create-exact-answer-question.dto';
import { CreateOrderQuestionDto } from '../../question/dto/create-order-question.dto';
import { Tag } from '../../tag/tag.entity';
import { MAX_TAGS, MIN_TAGS } from '../../../common/constants';

export class CreateTestDto extends CreateQuestionBulkDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  @ApiModelProperty({ minLength: 3, maxLength: 50 })
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiModelPropertyOptional({ default: 'https://i.imgur.com/yLiIVxG.jpg' })
  previewUrl?: string;

  @ApiModelPropertyOptional()
  @IsArray()
  @Type(() => CreateOneOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;

  @ApiModelPropertyOptional()
  @IsArray()
  @Type(() => CreateManyOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;

  @ApiModelPropertyOptional()
  @IsArray()
  @Type(() => CreateExactAnswerQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;

  @ApiModelPropertyOptional()
  @IsArray()
  @Type(() => CreateOrderQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  orderQuestions?: Array<CreateOrderQuestionDto>;

  @ApiModelPropertyOptional({ nullable: true, example: 1 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  order?: number;

  @ApiModelProperty({ type: 'string', isArray: true, example: ['MINI'] })
  @IsArray()
  @ArrayMinSize(MIN_TAGS)
  @ArrayMaxSize(MAX_TAGS)
  tags: Array<string>;
}

export class CreateTestInternalDto {
  title: string;
  previewUrl?: string;
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;
  orderQuestions?: Array<CreateOrderQuestionDto>;
  order?: number;
  tags: Array<Partial<Tag>>;
}
