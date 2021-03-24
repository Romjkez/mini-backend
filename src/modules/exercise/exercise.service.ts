import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto, CreateExerciseInternalDto } from './dto/create-exercise.dto';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const EXERCISE_RELATIONS = ['tests', 'articles', 'tags'];

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepo: Repository<ExerciseEntity>,
              private readonly logger: Logger) {
    logger.setContext('ExerciseService');
  }

  async createOne(dto: CreateExerciseDto): Promise<ExerciseEntity> {
    const dtoWithRelations: CreateExerciseInternalDto = {
      title: dto.title,
      isVisible: dto.isVisible,
      tests: dto.tests.map(id => ({ id })),
      tags: dto.tags.map(id => ({ id })),
      articles: dto.articles.map(id => ({ id })),
    };

    return from(this.exerciseRepo.save(dtoWithRelations))
      .pipe(
        switchMap(async (exercise: ExerciseEntity) =>
          this.exerciseRepo.findOne(exercise.id, { relations: EXERCISE_RELATIONS })),
      ).toPromise();
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
}
