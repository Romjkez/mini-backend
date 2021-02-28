import { Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';
import { Observable } from 'rxjs';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Post()
  createOne() {
  }

  @Get(':id')
  getById(@Param() params: IdDto) {
    return this.articleService.getById(params.id);
  }

  @Post(':id/hide')
  @HttpCode(200)
  hide(@Param() params: IdDto): Observable<void> {

  }

  @Post(':id/show')
  @HttpCode(200)
  show(@Param() params: IdDto): Observable<void> {

  }

  @Post('getMany')
  @HttpCode(200)
  getMany() {
  }

  @Put(':id')
  update(@Param() params: IdDto) {
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.articleService.delete(params.id);
  }
}
