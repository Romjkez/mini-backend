import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';
import { ArticleEntity } from '../../article/article.entity';
import { Test } from '../../test/test.entity';
import { IsBooleanString, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateExerciseDto {
  @ApiModelProperty({ description: 'Title of the exercise' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiModelPropertyOptional({ default: true, description: 'If the exercise should be visible to non-admin users' })
  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
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
