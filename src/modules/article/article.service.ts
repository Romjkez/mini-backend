import { Injectable, InternalServerErrorException, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { from, Observable } from 'rxjs';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleArticle } from './models/simple-article.model';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { ArticleRepository } from './article.repository';

export const ARTICLE_RELATIONS = ['favoriteFor', 'finishedBy'];

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
    return from(this.articleRepo.findOneOrFail(id, { relations: ARTICLE_RELATIONS }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyArticlesDto): Observable<GetManyResponseDto<SimpleArticle>> {
    throw new NotImplementedException();
  }

  addFinishedBy(): Observable<void> {
    throw new NotImplementedException();
  }

  addFavoriteFor(): Observable<void> {
    throw new NotImplementedException();
  }

  update(id: number, dto: UpdateArticleDto): Observable<Article> {
    return from(this.articleRepo.update(id, dto))
      .pipe(
        switchMap(() => from(this.articleRepo.findOne(id, { relations: ARTICLE_RELATIONS }))),
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
