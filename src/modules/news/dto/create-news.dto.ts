import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MAX_ARTICLE_TITLE_LENGTH, MIN_ARTICLE_TITLE_LENGTH } from '../../article/dto/create-article.dto';
import { MAX_TAGS, MIN_TAGS } from '../../../common/constants';
import { Tag } from '../../tag/tag.entity';

export class CreateNewsDto {
  @ApiModelProperty({
    example: 'Новый тест о MINI 3 door',
    minLength: MIN_ARTICLE_TITLE_LENGTH,
    maxLength: MAX_ARTICLE_TITLE_LENGTH,
  })
  @IsString()
  @MinLength(MIN_ARTICLE_TITLE_LENGTH)
  @MaxLength(MAX_ARTICLE_TITLE_LENGTH)
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  content: string;

  @ApiModelPropertyOptional({
    example: 'https://avtotachki.com/wp-content/uploads/2020/12/37.jpg',
    default: 'https://i.imgur.com/yLiIVxG.jpg',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  previewUrl?: string;

  @ApiModelProperty({ type: 'string', isArray: true })
  @IsArray()
  @ArrayMinSize(MIN_TAGS)
  @ArrayMaxSize(MAX_TAGS)
  tags: Array<string>;
}

export class CreateNewsInternalDto {
  title: string;
  content: string;
  previewUrl?: string;
  tags: Array<Partial<Tag>>;
}
