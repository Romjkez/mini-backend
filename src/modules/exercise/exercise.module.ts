import { Logger, Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './exercise.entity';
import { TagModule } from '../tag/tag.module';
import { TestModule } from '../test/test.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity]), TagModule, TestModule, ArticleModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, Logger],
})
export class ExerciseModule {
}
