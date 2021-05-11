import { Injectable, InternalServerErrorException, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { Article } from './models/article.model';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { ArticleRepository } from './article.repository';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, GetManyDto } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { ArticleEntity } from './article.entity';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';
import { UserRole } from '../user/models/user-role.enum';
import { JwtPayload } from '../auth/models/jwt-payload.model';

export const ARTICLE_RELATIONS = ['favoriteFor', 'finishedBy', 'tags'];

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleRepository) private readonly articleRepo: ArticleRepository,
              private readonly logger: Logger,
  ) {
    logger.setContext('ArticleService');
  }

  createOne(dto: CreateArticleDto): Observable<Article> {
    // todo проверять наличие тегов в DTO
    return from(this.articleRepo.insertOne(dto))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );

  }

  getById(id: number, payload: JwtPayload): Observable<Article> {
    return from(this.articleRepo.getById(id))
      .pipe(
        switchMap(async res => {
          if (payload.role === UserRole.EMPLOYEE) {
            const searchFinishedResult = await this.hasUserFinishedArticles(payload.sub, [res.id]);
            const searchFavoriteResult = await this.hasUserLikedArticles(payload.sub, [res.id]);
            res = setIsFinishedStatuses([res], searchFinishedResult)[0];
            res = setIsFavoriteStatuses([res], searchFavoriteResult)[0];
          }
          return res;
        }),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyArticlesDto & ExtractedJwtPayload): Observable<GetManyResponseDto<Article>> {
    return from(this.articleRepo.getMany(dto))
      .pipe(
        switchMap(async res => {
          if (dto.jwtPayload.role === UserRole.EMPLOYEE) {
            const searchFinishedResult = await this.hasUserFinishedArticles(dto.jwtPayload.sub, res[0].map(a => a.id));
            const searchFavoriteResult = await this.hasUserLikedArticles(dto.jwtPayload.sub, res[0].map(a => a.id));
            res[0] = setIsFinishedStatuses(res[0], searchFinishedResult);
            res[0] = setIsFavoriteStatuses(res[0], searchFavoriteResult);
          }
          return res;
        }),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        map(([result, count]) => {
          return {
            data: result,
            perPage: dto.perPage || DEFAULT_PER_PAGE,
            page: dto.page || DEFAULT_PAGE,
            totalItems: count,
          };
        }),
      );

  }

  update(id: number, dto: UpdateArticleDto): Observable<Article> {
    return from(this.articleRepo.update(id, dto))
      .pipe(
        switchMap(() => from(this.articleRepo.getById(id))),
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  hide(id: number): Observable<void> {
    // TODO: check if article is already hidden and throw err
    return from(this.articleRepo.update(id, { isVisible: false }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  show(id: number): Observable<void> {
    // TODO: check if article is already shown and throw err
    return from(this.articleRepo.update(id, { isVisible: true }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  getFinishedOfUser(id: number, dto: GetManyDto): Observable<Array<ArticleEntity>> {
    return from(this.articleRepo.createQueryBuilder('article')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .innerJoin('article.finishedBy', 'finishedBy', 'finishedBy.id =:id', { id })
      .getMany());
  }

  getFavoriteOfUser(id: number, dto: GetManyDto): Observable<Array<ArticleEntity>> {
    return from(this.articleRepo.createQueryBuilder('article')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .innerJoin('article.favoriteFor', 'favoriteFor', 'favoriteFor.id =:id', { id })
      .getMany());
  }

  async hasUserFinishedArticles(userId: number, articlesIds: Array<number>): Promise<Array<number>> {
    return this.articleRepo.createQueryBuilder('article')
      .innerJoin('article.finishedBy', 'finishedBy', 'finishedBy.id=:userId', { userId })
      .select('article.id')
      .where('article.id IN (:...articlesIds)', { articlesIds })
      .getMany()
      .then(res => res.map(article => article.id));
  }

  async hasUserLikedArticles(userId: number, articlesIds: Array<number>): Promise<Array<number>> {
    return this.articleRepo.createQueryBuilder('article')
      .innerJoin('article.favoriteFor', 'favoriteFor', 'favoriteFor.id=:userId', { userId })
      .select('article.id')
      .where('article.id IN (:...articlesIds)', { articlesIds })
      .getMany()
      .then(res => res.map(article => article.id));
  }

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }
}

function setIsFinishedStatuses(articles: Array<Article>, articlesIds: Array<number>): Array<Article> {
  if (articlesIds.length === 0) {
    return articles.map(article => {
      article.isFinished = false;
      return article;
    });
  }
  return articles.map(article => {
    article.isFinished = articlesIds.includes(article.id);
    return article;
  });

}

function setIsFavoriteStatuses(articles: Array<Article>, articlesIds: Array<number>): Array<Article> {
  if (articlesIds.length === 0) {
    return articles.map(article => {
      article.isFavorite = false;
      return article;
    });
  }
  return articles.map(article => {
    article.isFavorite = articlesIds.includes(article.id);
    return article;
  });

}
