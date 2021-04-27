import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExactAnswerQuestionDto } from './create-exact-answer-question.dto';

export class CreateExactAnswerQuestionBulkDto {
  @IsArray()
  @Type(() => CreateExactAnswerQuestionDto)
  @ValidateNested({ each: true })
  data: Array<CreateExactAnswerQuestionDto>;
}
