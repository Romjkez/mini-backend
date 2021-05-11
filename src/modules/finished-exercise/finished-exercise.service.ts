import { Injectable } from '@nestjs/common';
import { FinishedExerciseRepository } from './finished-exercise.repository';
import { CreateFinishedExerciseDto } from './dto/create-finished-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FinishedExerciseEntity } from './finished-exercise.entity';

@Injectable()
export class FinishedExerciseService {
  constructor(@InjectRepository(FinishedExerciseEntity) private readonly fExerciseRepo: FinishedExerciseRepository) {
  }

  createOne(dto: CreateFinishedExerciseDto) {

  }
}
