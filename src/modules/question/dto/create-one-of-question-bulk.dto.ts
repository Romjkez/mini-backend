import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOneOfQuestionDto } from './create-one-of-question.dto';

export class CreateOneOfQuestionBulkDto {
  @IsArray()
  @Type(() => CreateOneOfQuestionDto)
  @ValidateNested({ each: true })
  data: Array<CreateOneOfQuestionDto>;
}
