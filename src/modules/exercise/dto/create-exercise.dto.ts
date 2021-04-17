import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';
import { ArticleEntity } from '../../article/article.entity';
import { Test } from '../../test/test.entity';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExerciseDto {
  @ApiModelProperty({ description: 'Title of the exercise', example: 'Общая информация о MINI' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiModelPropertyOptional({ default: true, description: 'If the exercise should be visible to non-admin users' })
  @Transform(Boolean)
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isVisible?: boolean;

  @ApiModelProperty({ type: 'integer', isArray: true })
  @IsArray()
  tests: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  @IsArray()
  articles: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  @IsArray()
  tags: Array<number>;
}

export class CreateExerciseInternalDto {
  title: string;
  isVisible?: boolean;
  tests: Array<Partial<Test>>;
  articles: Array<Partial<ArticleEntity>>;
  tags: Array<Partial<Tag>>;
}
