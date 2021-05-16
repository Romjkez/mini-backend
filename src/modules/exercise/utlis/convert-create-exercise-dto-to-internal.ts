import { CreateExerciseDto, CreateExerciseInternalDto } from '../dto/create-exercise.dto';

export function convertCreateExerciseDtoToInternal(dto: CreateExerciseDto): CreateExerciseInternalDto {
  return {
    title: dto.title,
    isVisible: dto.isVisible,
    previewUrl: dto.previewUrl,
    tests: Array.from(new Set(dto.tests)).map(id => ({ id })),
    tags: Array.from(new Set(dto.tags)).map(id => ({ id })),
    articles: Array.from(new Set(dto.articles)).map(id => ({ id })),
  };
}
