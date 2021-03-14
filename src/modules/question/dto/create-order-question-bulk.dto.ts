import { CreateOrderQuestionDto } from './create-order-question.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderQuestionBulkDto {
  @IsArray()
  @Type(() => CreateOrderQuestionDto)
  @ValidateNested({ each: true })
  data: Array<CreateOrderQuestionDto>;
}
