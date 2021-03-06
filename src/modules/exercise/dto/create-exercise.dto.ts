import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';
import { ArticleEntity } from '../../article/article.entity';
import { Test } from '../../test/test.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_TAGS, MIN_TAGS } from '../../../common/constants';
import { ExerciseOwnedEntityDto } from './exercise-owned-entity.dto';

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

  @ApiModelPropertyOptional({ nullable: true, default: 'https://i.imgur.com/yLiIVxG.jpg' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  previewUrl?: string;

  @ApiModelProperty({ type: ExerciseOwnedEntityDto, isArray: true })
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  tests: Array<ExerciseOwnedEntityDto>;

  @ApiModelProperty({ type: ExerciseOwnedEntityDto, isArray: true })
  @ArrayMinSize(1)
  @ValidateNested()
  @IsArray()
  articles: Array<ExerciseOwnedEntityDto>;

  @ApiModelProperty({ type: 'string', isArray: true })
  @IsArray()
  @ArrayMinSize(MIN_TAGS)
  @ArrayMaxSize(MAX_TAGS)
  tags: Array<string>;
}

export class CreateExerciseInternalDto {
  title: string;
  isVisible?: boolean;
  previewUrl?: string;
  tests: Array<Partial<Test>>;
  articles: Array<Partial<ArticleEntity>>;
  tags: Array<Partial<Tag>>;
}
