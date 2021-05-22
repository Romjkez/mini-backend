import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Tag } from '../../tag/tag.entity';

export class CreateArticleDto {
  @ApiModelProperty({ example: 'История основателей MINI' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @ApiModelProperty({
    // eslint-disable-next-line max-len
    example: 'Леонард Перси Лорд, 1-й барон Lambury KBE 1896 года рождения был значимым человеком в британской автомобильной промышленности. Окончил школу с внушительным техническим уклоном, однако в 16 лет вынужден был уйти в свободное плавание после потери отца. \n' +
      '\n' + // eslint-disable-next-line max-len
      'В это время Лорд начинает активно применять полученные в школе технические знания, и уже 1923 году попал в фирму Morris Motors Limited, где помогал оптимизировать все этапы процесса производства. В 1927 году, когда Моррис приобрел права на управление компанией Wolseley Motors Limited, Леонарда перевели туда с целью совершенствования своего технического оснащения и технологических процессов. Уже в 1932 году его назначают генеральным менеджером в фирме Morris Motors. Всего через год, в 1933 году благодаря своей эффективности Леонард Лорд получает место управляющего директора всей компании Morris Motors Limited и становится вскоре титулованным мультимиллионером.',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  content: string;

  @ApiModelPropertyOptional({ example: null, nullable: true })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  video?: string;

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
  tags: Array<string>;
}

export class CreateArticleInternalDto {
  title: string;
  content: string;
  video?: string;
  previewUrl?: string;
  tags: Array<Partial<Tag>>;
}
