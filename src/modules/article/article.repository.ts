import { EntityRepository, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ARTICLE_RELATIONS } from './article.service';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  /**
   * Insert one article
   * @param dto
   */
  insertOne(dto: CreateArticleDto): Observable<Article> {
    return from(super.save(dto))
      .pipe(
        switchMap(article => from(this.findOne(article.id, { relations: ARTICLE_RELATIONS }))),
      );
  }
}
