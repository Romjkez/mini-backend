import { SelectQueryBuilder } from 'typeorm';
import { SimpleExercise } from '../model/simple-exercise.model';
import { ExerciseSortDto } from '../dto/exercise-sort.dto';

export function addExerciseSort(qb: SelectQueryBuilder<SimpleExercise>,
                                sortOptions: ExerciseSortDto,
                                entityName: string): SelectQueryBuilder<SimpleExercise> {
  if (sortOptions.createdAt) {
    qb = qb.addOrderBy(`"${entityName}"."createdAt"`, sortOptions.createdAt);
  }

  if (sortOptions.updatedAt) {
    qb = qb.addOrderBy(`"${entityName}"."updatedAt"`, sortOptions.updatedAt);
  }

  if (sortOptions.isVisible) {
    qb = qb.addOrderBy(`"${entityName}"."isVisible"`, sortOptions.isVisible);
  }

  return qb;
}
