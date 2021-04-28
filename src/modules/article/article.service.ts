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
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';

export const ARTICLE_RELATIONS = ['favoriteFor', 'finishedBy', 'tags'];

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleRepository) private readonly articleRepo: ArticleRepository,
              private readonly logger: Logger,
  ) {
    logger.setContext('ArticleService');
  }

  createOne(dto: CreateArticleDto): Observable<Article> {
    return from(this.articleRepo.insertOne(dto))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );

  }

  getById(id: number): Observable<Article> {
    return from(this.articleRepo.getById(id))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyArticlesDto): Observable<GetManyResponseDto<Article>> {
    return from(this.articleRepo.getMany(dto))
      .pipe(
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

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }
}
