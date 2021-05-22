import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository]), TagModule],
  providers: [ArticleService, Logger],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
