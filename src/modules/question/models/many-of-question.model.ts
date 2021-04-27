import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from './question-type';
import { CommonOption } from '../../option/models/correct-option.model';

export class ManyOfQuestion {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.MultipleOf })
  readonly type: QuestionType.MultipleOf;

  @ApiModelProperty()
  text: string;

  @ApiModelProperty({ type: CommonOption, isArray: true })
  options: Array<CommonOption>;

  @ApiModelProperty()
  order: number;
}
