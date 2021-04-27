import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SimpleExercise } from './model/simple-exercise.model';
import { convertCreateExerciseDtoToInternal } from './utlis/convert-create-exercise-dto-to-internal';
import { GetManyExercisesDto } from './dto/get-many-exercises.dto';
import { DEFAULT_PER_PAGE } from '../../common/dto/get-many.dto';
import { calculateQueryOffset } from '../../common/utils';
import { addExerciseSort } from './utlis/add-exercise-sort';
import { addExerciseFilter } from './utlis/add-exercise-filter';

export const EXERCISE_RELATIONS = ['tests', 'articles', 'tags'];

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepo: Repository<ExerciseEntity>,
              private readonly logger: Logger) {
    logger.setContext('ExerciseService');
  }

  createOne(dto: CreateExerciseDto): Observable<ExerciseEntity> {
    return from(this.exerciseRepo.save(convertCreateExerciseDtoToInternal(dto)))
      .pipe(
        switchMap(async (exercise: ExerciseEntity) =>
          this.exerciseRepo.findOne(exercise.id, { relations: EXERCISE_RELATIONS })),
      );
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

  getMany(dto: GetManyExercisesDto): Observable<Array<SimpleExercise>> {
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

    return from(qb.getMany());
  }
}
