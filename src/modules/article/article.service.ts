import { Injectable, InternalServerErrorException, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleRepo: Repository<ArticleEntity>,
    private readonly logger: Logger,
  ) {
    logger.setContext('ArticleService');
  }

  createOne() {

  }

  getById(id: number): Observable<ArticleEntity> {
    return from(this.articleRepo.findOneOrFail(id, { relations: ['finishedBy'] }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany() {
  }

  addFinishedBy() {
  }

  update() {
  }

  hide() {
  }

  show() {
  }

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }
}
