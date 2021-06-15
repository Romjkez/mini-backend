import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { NewsEntity } from './news.entity';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { NewsRepository } from './news.repository';
import { CreateNewsDto, CreateNewsInternalDto } from './dto/create-news.dto';
import { TagService } from '../tag/tag.service';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { GetManyNewsDto } from './dto/get-many-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepo: NewsRepository,
              private readonly logger: Logger,
              private readonly tagService: TagService) {
    logger.setContext('NewsService');
  }

  createOne(dto: CreateNewsDto): Observable<NewsEntity> {
    return this.tagService.resolveByText(dto.tags)
      .pipe(
        map(tags => ({ ...dto, tags } as CreateNewsInternalDto)),
        switchMap(resolvedDto => this.newsRepo.insertOne(resolvedDto)),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getById(id: number): Observable<NewsEntity> {
    return this.newsRepo.getById(id)
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyNewsDto): Observable<GetManyResponseDto<NewsEntity>> {
    return this.newsRepo.getMany(dto)
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

  remove(id: number): Observable<void> {
    return from(this.newsRepo.delete({ id }))
      .pipe(
        mapTo(null),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
