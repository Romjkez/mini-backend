import { Module } from '@nestjs/common';
import { FinishedExerciseService } from './finished-exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedExerciseEntity } from './finished-exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinishedExerciseEntity])],
  providers: [FinishedExerciseService],
})
export class FinishedExerciseModule {}
