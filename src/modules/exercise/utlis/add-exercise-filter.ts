import { SelectQueryBuilder } from 'typeorm';
import { SimpleExercise } from '../model/simple-exercise.model';
import { ExerciseFilterDto } from '../dto/exercise-filter.dto';

export function addExerciseFilter(qb: SelectQueryBuilder<SimpleExercise>, filter: ExerciseFilterDto, entityName: string)
  : SelectQueryBuilder<SimpleExercise> {
  if (typeof filter.isVisible === 'boolean') {
    qb = qb.andWhere(`"${entityName}"."isVisible" = :isVisible`, { isVisible: filter.isVisible });
  }

  if (filter.title) {
    qb = qb.andWhere(`"${entityName}"."title" ILIKE :title`, { title: `%${filter.title}%` });
  }

  return qb;
}
