import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { from, Observable, of, zip } from 'rxjs';
import { CreateTagDto } from './dto/create-tag.dto';
import { GetManyTagsDto } from './dto/get-many-tags.dto';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { addTagSort } from './utils/add-tag-sort';
import { addTagFilter } from './utils/add-tag-filter';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepo: Repository<Tag>,
              private readonly logger: Logger) {
    logger.setContext('TagService');
  }

  createOne(dto: CreateTagDto): Observable<Tag> {
    return from(this.tagRepo.save(dto))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          if (err.code === '23505') {
            throw new BadRequestException('TAG_ALREADY_EXISTS');
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }

  createBulk(dto: Array<CreateTagDto>): Observable<Array<Tag>> {
    return from(this.tagRepo.save(dto))
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          if (err.code === '23505') {
            throw new BadRequestException('TAG_ALREADY_EXISTS');
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }

  /**
   * Get tags by text and create not existing
   * @param tags
   */
  resolveByText(tags: Array<string>): Observable<Array<Tag>> {
    const processedTags = Array.from(new Set(tags)).map(tag => tag.trim());

    let qb = this.tagRepo.createQueryBuilder('tag').select();
    for (let i = 0; i < processedTags.length; i++) {
      qb = qb.orWhere(`tag.text ILIKE :${i}`, { [i]: processedTags[i] });
    }
    return from(qb.getMany())
      .pipe(
        map(foundTags => {
          const newTags = [];
          processedTags.forEach(tag => {
            // Decide which tags should be created
            const wasFound = foundTags.find(foundTag => foundTag.text.toLowerCase() === tag.toLowerCase());
            if (!wasFound) {
              newTags.push({ text: tag } as Partial<Tag>);
            }
          });
          return [foundTags, newTags];
        }),
        switchMap(([foundTags, newTags]) => zip(of(foundTags), this.tagRepo.save(newTags))),
        map(([foundTags, savedNewTags]) => [...foundTags, ...savedNewTags]),
      );
  }

  getMany(dto: GetManyTagsDto): Observable<GetManyResponseDto<Tag>> {
    const entityName = 'tag';
    let qb = this.tagRepo.createQueryBuilder(entityName)
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page));

    if (dto.sort) {
      qb = addTagSort(qb, dto.sort, entityName);
    }

    if (dto.filter) {
      qb = addTagFilter(qb, dto.filter, entityName);
    }

    return from(qb.getManyAndCount())
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        map(res => {
          return {
            data: res[0],
            perPage: dto?.perPage || DEFAULT_PER_PAGE,
            page: dto?.page || DEFAULT_PAGE,
            totalItems: res[1],
          };
        }),
      );
  }
}
