import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { MAX_ARTICLE_TITLE_LENGTH, MIN_ARTICLE_TITLE_LENGTH } from './create-article.dto';

export class UpdateArticleDto {
  @ApiModelPropertyOptional({
    example: 'История основателей MINI',
    minLength: MIN_ARTICLE_TITLE_LENGTH,
    maxLength: MAX_ARTICLE_TITLE_LENGTH,
  })
  @IsString()
  @MinLength(MIN_ARTICLE_TITLE_LENGTH)
  @MaxLength(MAX_ARTICLE_TITLE_LENGTH)
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @ApiModelPropertyOptional({ example: 'https://www.youtube.com/watch?v=mU4TZ99yAdo' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  video?: string;

  @ApiModelPropertyOptional({
    // eslint-disable-next-line max-len
    example: 'Леонард Перси Лорд, 1-й барон Lambury KBE 1896 года рождения был значимым человеком в британской автомобильной промышленности. Окончил школу с внушительным техническим уклоном, однако в 16 лет вынужден был уйти в свободное плавание после потери отца. \n',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  content?: string;

  @ApiModelPropertyOptional({ example: 'https://avtotachki.com/wp-content/uploads/2021/02/mini-hatchback-electric-2019.jpg' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  previewUrl?: string;

  @ApiModelPropertyOptional({ description: 'Is article visible in articles list' })
  @Transform(Boolean)
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isVisible: boolean;
}
