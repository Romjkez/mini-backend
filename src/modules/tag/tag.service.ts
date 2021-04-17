import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetManyTagsDto } from './dto/get-many-tags.dto';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { catchError, map } from 'rxjs/operators';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
              private readonly logger: Logger) {
    logger.setContext('TagService')
  }

  createOne(dto: CreateTagDto): Observable<Tag> {
    return from(this.tagRepo.save(dto));
  }

  createBulk(dto: Array<CreateTagDto>): Observable<Array<Tag>> {
    return from(this.tagRepo.save(dto));
  }

  getMany(dto: GetManyTagsDto): Observable<GetManyResponseDto<Tag>> {
    const entityName = 'tag';
    const qb = this.tagRepo.createQueryBuilder(entityName)
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page));

    // TODO: apply sort
    if (dto.sort) {
    }

    // TODO: apply filtering
    if(dto.filter) {}

    return from(qb.getManyAndCount())
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        map(res=>{
          return {
            data: res[0],
            perPage: dto?.perPage || DEFAULT_PER_PAGE,
            page: dto?.page || DEFAULT_PAGE,
            totalItems: res[1],
          }
        }),
      )
  }
}
