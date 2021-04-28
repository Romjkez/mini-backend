import { EntityRepository, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './models/article.model';
import { ArticleRelationsInfo } from './models/article-relations-info';
import { convertRawArticleToArticle } from './utils';
import { convertCreateArticleDtoToInternal } from './utils/convert-create-article-dto-to-internal';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {
  /**
   * Insert one article
   * @param dto
   */
  insertOne(dto: CreateArticleDto): Observable<Article> {
    return from(super.save(convertCreateArticleDtoToInternal(dto)))
      .pipe(
        switchMap(async article => this.createQueryBuilder('article')
          .leftJoinAndSelect('article.favoriteFor', 'favoriteFor')
          .loadRelationCountAndMap('article.favoriteFor', 'article.favoriteFor')
          .loadRelationCountAndMap('article.finishedBy', 'article.finishedBy')
          .loadRelationIdAndMap('article.tags', 'article.tags')
          .where('article.id = :id', { id: article.id })
          .getOne(),
        ),
        map(article => {
          return convertRawArticleToArticle(article as unknown as Article & ArticleRelationsInfo);
        }),
      );
  }

  /**
   * Get one article and count `favoriteBy`, `finishedBy` relations
   * @param id
   */
  getById(id: number): Observable<Article> {
    return from(
      this.createQueryBuilder('article')
        .loadRelationCountAndMap('article.favoriteFor', 'article.favoriteFor')
        .loadRelationCountAndMap('article.finishedBy', 'article.finishedBy')
        .where('article.id = :id', { id })
        .leftJoinAndSelect('article.tags', 'tags')
        .getOne())
      .pipe(
        map(article => convertRawArticleToArticle(article as unknown as Article & ArticleRelationsInfo)),
      );
  }
}
