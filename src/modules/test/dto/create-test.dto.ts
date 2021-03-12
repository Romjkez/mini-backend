import { CreateOneOfQuestionBulkDto } from '../../question/dto/create-one-of-question-bulk.dto';
import { CreateManyOfQuestionBulkDto } from '../../question/dto/create-many-of-question-bulk.dto';
import { CreateExactAnswerQuestionBulkDto } from '../../question/dto/create-exact-answer-question-bulk.dto';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, ValidateNested } from 'class-validator';
import { CreateQuestionBulkDto } from '../../question/dto/create-question-bulk.dto';

export class CreateTestDto extends CreateQuestionBulkDto {
  // todo check validation, replace with Array<Single> if needed
  // todo remove ValidateNested if it is ok
  @ApiModelPropertyOptional({ type: CreateManyOfQuestionBulkDto, nullable: true })
  @Type(() => CreateOneOfQuestionBulkDto)
  @ValidateNested({ each: true })
  @IsOptional()
  oneOfQuestions?: CreateOneOfQuestionBulkDto;

  @ApiModelPropertyOptional({ type: CreateManyOfQuestionBulkDto, nullable: true })
  @Type(() => CreateManyOfQuestionBulkDto)
  @ValidateNested({ each: true })
  @IsOptional()
  manyOfQuestions?: CreateManyOfQuestionBulkDto;

  @ApiModelPropertyOptional({ type: CreateExactAnswerQuestionBulkDto, nullable: true })
  @Type(() => CreateManyOfQuestionBulkDto)
  @ValidateNested({ each: true })
  @IsOptional()
  exactAnswerQuestions?: CreateExactAnswerQuestionBulkDto;

  @ApiModelPropertyOptional({ nullable: true, example: 1 })
  @IsOptional()
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  order?: number;

  @ApiModelPropertyOptional({ nullable: true, example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  exercise?: number;
}
