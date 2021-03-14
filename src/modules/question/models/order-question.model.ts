import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from './question-type';
import { OrderOption } from '../../option/models/order-option.model';
import { CommonOption } from '../../option/models/correct-option.model';

export class OrderQuestion {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.Order })
  readonly type: QuestionType.Order;

  @ApiModelProperty()
  text: string;

  @ApiModelProperty({ type: CommonOption, isArray: true })
  options: Array<OrderOption>;

  @ApiModelProperty()
  order: number;
}
