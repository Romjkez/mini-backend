import { CreateArticleDto, CreateArticleInternalDto } from '../dto/create-article.dto';

export function convertCreateArticleDtoToInternal(dto: CreateArticleDto): CreateArticleInternalDto {
  return {
    video: dto.video,
    tags: Array.from(new Set(dto.tags)).map(id => ({ id })),
    title: dto.title,
    content: dto.content,
    previewUrl: dto.previewUrl,
  };
}
