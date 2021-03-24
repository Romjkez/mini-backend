import { Logger, Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  controllers: [ExerciseController],
  providers: [ExerciseService, Logger],
})
export class ExerciseModule {
}
