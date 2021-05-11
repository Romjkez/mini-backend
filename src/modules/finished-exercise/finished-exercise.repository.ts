import { EntityRepository } from 'typeorm';
import { FinishedExerciseEntity } from './finished-exercise.entity';

@EntityRepository(FinishedExerciseEntity)
export class FinishedExerciseRepository {
}
