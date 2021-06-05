import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Test } from '../test.entity';

export class SimpleTest {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty({ example: 'История MINI' })
  title: string;

  @ApiModelPropertyOptional()
  previewUrl?: string;

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

  @ApiModelPropertyOptional({ description: 'Returned only to users with role EMPLOYEE' })
  isFinished?: boolean;

  @ApiModelProperty()
  updatedAt: Pick<Test, 'updatedAt'>;

  @ApiModelProperty()
  tags: Pick<Test, 'tags'>;
}
