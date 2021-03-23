import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ExerciseService {
  constructor(@InjectRepository(ExerciseEntity) private readonly exerciseRepo: Repository<ExerciseEntity>,
              private readonly logger: Logger) {
    logger.setContext('ExerciseService');
  }

  createOne(dto: CreateExerciseDto): Observable<ExerciseEntity> {
    return from(this.exerciseRepo.save(dto as unknown as ExerciseEntity))
      .pipe(
        switchMap(async (exercise: ExerciseEntity) =>
          this.exerciseRepo.findOne(exercise.id, { relations: ['tests', 'articles'] })),
      );
  }

  getById(id: number): Observable<ExerciseEntity> {
    return from(this.exerciseRepo.findOneOrFail(id, { relations: ['tests', 'articles'] }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
