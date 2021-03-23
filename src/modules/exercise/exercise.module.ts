import { Logger, Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './exercise.entity';
import { Test } from '../test/test.entity';
import { ArticleRepository } from '../article/article.repository';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity, Test, ArticleRepository, Tag])],
  controllers: [ExerciseController],
  providers: [ExerciseService, Logger],
})
export class ExerciseModule {
}
