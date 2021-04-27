import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from './question-type';
import { CommonOption } from '../../option/models/correct-option.model';

export class OneOfQuestion {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.OneOf })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  text: string;

  @ApiModelProperty({ type: CommonOption, isArray: true })
  options: Array<CommonOption>;

  @ApiModelProperty()
  order: number;
}
