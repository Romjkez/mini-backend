import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManyOfQuestionDto } from './create-many-of-question.dto';

export class CreateManyOfQuestionBulkDto {
  @IsArray()
  @Type(() => CreateManyOfQuestionDto)
  @ValidateNested({ each: true })
  data: Array<CreateManyOfQuestionDto>;
}
