import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto, CreateExerciseInternalDto } from './dto/create-exercise.dto';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SimpleExercise } from './model/simple-exercise.model';
import { GetManyExercisesDto } from './dto/get-many-exercises.dto';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { addExerciseSort } from './utlis/add-exercise-sort';
import { addExerciseFilter } from './utlis/add-exercise-filter';
import { TagService } from '../tag/tag.service';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { TestService } from '../test/test.service';
import { ArticleService } from '../article/article.service';

export const EXERCISE_RELATIONS = ['tests', 'articles', 'tags'];

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepo: Repository<ExerciseEntity>,
              private readonly logger: Logger,
              private readonly tagService: TagService,
              private readonly testService: TestService,
              private readonly articleService: ArticleService) {
    logger.setContext('ExerciseService');
  }

  createOne(dto: CreateExerciseDto): Observable<ExerciseEntity> {
    return this.tagService.resolveByText(dto.tags)
      .pipe(
        map(tags => {
          const internalDto: CreateExerciseInternalDto = {
            ...dto,
            tags,
            tests: Array.from(new Set(dto.tests)).map(testDto => ({ id: testDto.id })),
            articles: Array.from(new Set(dto.articles)).map(articleDto => ({ id: articleDto.id })),
          };
          return internalDto;
        }),
        switchMap(async dto => this.exerciseRepo.save(dto)),
        tap(() => {
          dto.tests.forEach(t => this.testService.updateOrder(t.id, t.order).subscribe());
          dto.articles.forEach(t => this.articleService.update(t.id, { order: t.order }).subscribe());
        }),
        switchMap(async exercise => this.exerciseRepo.findOne(exercise.id, { relations: EXERCISE_RELATIONS })));
  }

  getById(id: number): Observable<ExerciseEntity> {
    return from(this.exerciseRepo.findOneOrFail(id, { relations: EXERCISE_RELATIONS }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getMany(dto: GetManyExercisesDto): Observable<GetManyResponseDto<SimpleExercise>> {
    const entityName = 'exercise';
    let qb = (this.exerciseRepo as unknown as Repository<SimpleExercise>).createQueryBuilder(entityName)
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page))
      .loadRelationCountAndMap('exercise.articles', 'exercise.articles')
      .loadRelationCountAndMap('exercise.tests', 'exercise.tests')
      .leftJoinAndSelect('exercise.tags', 'tags');

    if (dto.sort) {
      qb = addExerciseSort(qb, dto.sort, entityName);
    }

    if (dto.filter) {
      qb = addExerciseFilter(qb, dto.filter, entityName);
    }

    return from(qb.getManyAndCount())
      .pipe(
        map(([result, count]) => ({
          data: result,
          perPage: dto.perPage || DEFAULT_PER_PAGE,
          page: dto.page || DEFAULT_PAGE,
          totalItems: count,
        })),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
