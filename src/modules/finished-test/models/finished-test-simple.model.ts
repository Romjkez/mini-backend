import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Test } from '../../test/test.entity';

export class FinishedTestSimple {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({ type: 'integer', description: 'Owner\'s ID' })
  finishedBy: number;

  @ApiModelProperty({ type: 'integer', description: 'Number of answers' })
  oneOfQuestionAnswers: number;

  @ApiModelProperty({ type: 'integer', description: 'Number of answers' })
  manyOfQuestionAnswers: number;

  @ApiModelProperty({ type: 'integer', description: 'Number of answers' })
  orderQuestionAnswers: number;

  @ApiModelProperty({ type: 'integer', description: 'Number of answers' })
  exactAnswerQuestionAnswers: number;

  @ApiModelProperty({ type: Test })
  test: Test;

  @ApiModelProperty({ readOnly: true })
  finishedAt: Date;

  @ApiModelProperty({ readOnly: true, maximum: 1, minimum: 0 })
  result: number;

  @ApiModelProperty({ readOnly: true })
  correctAnswers: number;
}
