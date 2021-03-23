import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';
import { ArticleEntity } from '../../article/article.entity';
import { Test } from '../../test/test.entity';

export class CreateExerciseDto {
  @ApiModelProperty({ description: 'Title of the exercise' })
  title: string;

  @ApiModelPropertyOptional({ default: true, description: 'If the exercise should be visible to non-admin users' })
  isVisible?: boolean;

  @ApiModelProperty({ type: 'integer', isArray: true })
  tests: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  articles: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  tags: Array<number>;
}

export class CreateExerciseInternalDto {
  title: string;
  isVisible?: boolean;
  tests: Array<Test>;
  articles: Array<ArticleEntity>;
  tags: Array<Tag>;
}
