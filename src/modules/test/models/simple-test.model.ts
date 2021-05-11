import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Test } from '../test.entity';

export class SimpleTest {
  @ApiModelProperty()
  id: Pick<Test, 'id'>;

  @ApiModelProperty()
  oneOfQuestions: number;

  @ApiModelProperty()
  manyOfQuestions: number;

  @ApiModelProperty()
  exactAnswerQuestions: number;

  @ApiModelProperty()
  orderQuestions: number;

  @ApiModelProperty()
  isVisible: Pick<Test, 'isVisible'>;

  @ApiModelProperty({ readOnly: true })
  createdAt: Pick<Test, 'createdAt'>;

  @ApiModelProperty()
  updatedAt?: Pick<Test, 'updatedAt'>;

  @ApiModelProperty()
  tags: Pick<Test, 'tags'>;
}
