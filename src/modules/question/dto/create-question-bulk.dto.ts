import { CreateOneOfQuestionDto } from './create-one-of-question.dto';
import { CreateManyOfQuestionDto } from './create-many-of-question.dto';
import { CreateExactAnswerQuestionDto } from './create-exact-answer-question.dto';
import { CreateOrderQuestionDto } from './create-order-question.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateQuestionBulkDto {
  @ApiModelProperty({ type: CreateOneOfQuestionDto, isArray: true })
  @IsArray()
  @Type(() => CreateOneOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;

  @ApiModelProperty({ type: CreateManyOfQuestionDto, isArray: true })
  @IsArray()
  @Type(() => CreateManyOfQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;

  @ApiModelProperty({ type: CreateExactAnswerQuestionDto, isArray: true })
  @IsArray()
  @Type(() => CreateExactAnswerQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;

  @ApiModelProperty({ type: CreateOrderQuestionDto, isArray: true })
  @IsArray()
  @Type(() => CreateOrderQuestionDto)
  @ValidateNested({ each: true })
  @IsOptional()
  orderQuestions?: Array<CreateOrderQuestionDto>;
}
