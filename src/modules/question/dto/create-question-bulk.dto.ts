import { CreateOneOfQuestionDto } from './create-one-of-question.dto';
import { CreateManyOfQuestionDto } from './create-many-of-question.dto';
import { CreateExactAnswerQuestionDto } from './create-exact-answer-question.dto';
import { CreateOrderQuestionDto } from './create-order-question.dto';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionBulkDto {
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
}
