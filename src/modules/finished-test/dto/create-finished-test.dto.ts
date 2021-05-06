import { IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { CreateOneOfQuestionAnswerDto } from '../../user-answer/dto/create-one-of-question-answer.dto';
import { CreateManyOfQuestionAnswerDto } from '../../user-answer/dto/create-many-of-question-answer.dto';
import { CreateOrderQuestionAnswerDto } from '../../user-answer/dto/create-order-question-answer.dto';
import { CreateExactAnswerQuestionAnswerDto } from '../../user-answer/dto/create-exact-answer-question-answer.dto';

export class CreateFinishedTestDto {
  @ApiModelProperty({ type: 'integer', description: 'ID of user that finished the test' })
  @IsInt()
  @IsPositive()
  finishedBy: number;

  @ApiModelProperty({ type: 'integer', description: 'ID of finished test' })
  @IsInt()
  @IsPositive()
  test: number;

  @ApiModelProperty({ type: CreateOneOfQuestionAnswerDto, isArray: true })
  @Type(() => CreateOneOfQuestionAnswerDto)
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  oneOfQuestionAnswers: Array<CreateOneOfQuestionAnswerDto>;

  @ApiModelProperty({ type: CreateManyOfQuestionAnswerDto, isArray: true })
  @Type(() => CreateManyOfQuestionAnswerDto)
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  manyOfQuestionAnswers: Array<CreateManyOfQuestionAnswerDto>;

  @ApiModelProperty({ type: CreateOrderQuestionAnswerDto, isArray: true })
  @Type(() => CreateOrderQuestionAnswerDto)
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  orderQuestionAnswers: Array<CreateOrderQuestionAnswerDto>;

  @ApiModelProperty({ type: CreateExactAnswerQuestionAnswerDto, isArray: true })
  @Type(() => CreateExactAnswerQuestionAnswerDto)
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  exactAnswerQuestionAnswers: Array<CreateExactAnswerQuestionAnswerDto>;
}
