import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticleService, Logger],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
