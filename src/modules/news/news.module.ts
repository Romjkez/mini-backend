import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TagModule } from '../tag/tag.module';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsRepository]), TagModule],
  controllers: [NewsController],
  providers: [NewsService, Logger],
  exports: [NewsService],
})
export class NewsModule {}
