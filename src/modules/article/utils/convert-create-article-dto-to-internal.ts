import { CreateArticleDto, CreateArticleInternalDto } from '../dto/create-article.dto';

export function convertCreateArticleDtoToInternal(dto: CreateArticleDto): CreateArticleInternalDto {
  return {
    video: dto.video,
    tags: dto.tags.map(tag => ({ text: tag })),
    title: dto.title,
    content: dto.content,
    previewUrl: dto.previewUrl,
  };
}
