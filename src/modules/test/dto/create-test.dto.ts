import { Type } from 'class-transformer';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { CreateQuestionBulkDto } from '../../question/dto/create-question-bulk.dto';
import { CreateOneOfQuestionDto } from '../../question/dto/create-one-of-question.dto';
import { CreateManyOfQuestionDto } from '../../question/dto/create-many-of-question.dto';
import { CreateExactAnswerQuestionDto } from '../../question/dto/create-exact-answer-question.dto';
import { CreateOrderQuestionDto } from '../../question/dto/create-order-question.dto';
import { Tag } from '../../tag/tag.entity';

export class CreateTestDto extends CreateQuestionBulkDto {
  @IsArray()
  @Type(() => CreateOneOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;

  @IsArray()
  @Type(() => CreateManyOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;

  @IsArray()
  @Type(() => CreateExactAnswerQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;

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

  @ApiModelProperty({ type: 'integer', isArray: true, example: [1] })
  @IsArray()
  tags: Array<number>;
}

export class CreateTestInternalDto {
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;
  orderQuestions?: Array<CreateOrderQuestionDto>;
  order?: number;
  tags: Array<Partial<Tag>>;
}
