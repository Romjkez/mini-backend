import { EntityRepository, Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { from, Observable } from 'rxjs';
import { CreateNewsInternalDto } from './dto/create-news.dto';
import { switchMap } from 'rxjs/operators';
import { DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { addNewsSort } from './utils/add-news-sort';
import { GetManyNewsDto } from './dto/get-many-news.dto';

@EntityRepository(NewsEntity)
export class NewsRepository extends Repository<NewsEntity> {
  insertOne(dto: CreateNewsInternalDto): Observable<NewsEntity> {
    return from(super.save(dto))
      .pipe(
        switchMap(async news => this.createQueryBuilder('news')
          .leftJoinAndSelect('news.tags', 'tags')
          .where('news.id = :id', { id: news.id })
          .getOne(),
        ),
      );
  }

  getById(id: number): Observable<NewsEntity> {
    return from(
      this.createQueryBuilder('news')
        .where('news.id = :id', { id })
        .leftJoinAndSelect('news.tags', 'tags')
        .getOne());
  }

  getMany(dto: GetManyNewsDto): Observable<[Array<NewsEntity>, number]> {
    let qb = this.createQueryBuilder('news')
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .leftJoinAndSelect('news.tags', 'tags');

    if (dto.sort) {
      qb = addNewsSort(qb, dto.sort, 'news');
    }

    return from(qb.getManyAndCount() as unknown as Promise<[Array<NewsEntity>, number]>);

  }
}
