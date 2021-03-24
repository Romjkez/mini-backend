import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';

export class SimpleExercise {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'Вводное упражнение' })
  title: string;

  @ApiModelProperty()
  createdAt: Date;

  @ApiModelProperty()
  updatedAt: Date;

  @ApiModelProperty({ example: 3 })
  tests: number;

  @ApiModelProperty({ example: 4 })
  articles: number;

  @ApiModelProperty({ type: Tag, isArray: true })
  tags: Array<Tag>;
}
