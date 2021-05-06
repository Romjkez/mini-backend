import { Article } from './models/article.model';
import { ArticleRelationsInfo } from './models/article-relations-info';

/**
 * Convert Article with info about relations (query result) to normal Article
 * @param rawArticle
 */
export function convertRawArticleToArticle(rawArticle: Article & ArticleRelationsInfo): Article {
  return {
    id: rawArticle.id,
    title: rawArticle.title,
    video: rawArticle.video,
    content: rawArticle.content,
    isVisible: rawArticle.isVisible,
    previewUrl: rawArticle.previewUrl,
    createdAt: rawArticle.createdAt,
    updatedAt: rawArticle.updatedAt,
    finishedBy: rawArticle.finishedBy,
    favoriteFor: rawArticle.favoriteFor,
    tags: rawArticle.tags,
  };
}
