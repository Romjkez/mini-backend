import { EntityRepository, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './models/article.model';
import { ArticleRelationsInfo } from './models/article-relations-info';
import { convertRawArticleToArticle } from './utils';
import { convertCreateArticleDtoToInternal } from './utils/convert-create-article-dto-to-internal';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { addArticleSort } from './utils/add-article-sort';
import { addArticleFilter } from './utils/add-article-filter';

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

  getMany(dto: GetManyArticlesDto): Observable<[Array<Article>, number]> {
    let qb = this.createQueryBuilder('article')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .loadRelationCountAndMap('article.favoriteFor', 'article.favoriteFor')
      .loadRelationCountAndMap('article.finishedBy', 'article.finishedBy')
      .leftJoinAndSelect('article.tags', 'tags');

    if (dto.sort) {
      qb = addArticleSort(qb, dto.sort, 'article');
    }

    if (dto.filter) {
      qb = addArticleFilter(qb, dto.filter, 'article');
    }

    return from(qb.getManyAndCount() as unknown as Promise<[Array<Article>, number]>);
  }
}
