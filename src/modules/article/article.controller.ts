import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';
import { Observable } from 'rxjs';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleArticle } from './models/simple-article.model';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { AddFinishedByDto } from './dto/add-finished-by.dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @Post()
  createOne(@Body() dto: CreateArticleDto): Observable<Article> {
    return this.articleService.createOne(dto);
  }


  @Get(':id')
  getById(@Param() params: IdDto) {
    return this.articleService.getById(params.id);
  }

  @Post(':articleId/finishedBy/:userId')
  addFinishedBy(@Param() dto: AddFinishedByDto) {
    return null;
  }


  @Post(':id/hide')
  @HttpCode(200)
  hide(@Param() params: IdDto): Observable<void> {
    return this.articleService.hide(params.id);
  }


  @Post(':id/show')
  @HttpCode(200)
  show(@Param() params: IdDto): Observable<void> {
    return this.articleService.show(params.id);
  }

  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyArticlesDto): Observable<GetManyResponseDto<SimpleArticle>> {
    return this.articleService.getMany(dto);
  }


  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: UpdateArticleDto): Observable<Article> {
    return this.articleService.update(params.id, dto);
  }


  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.articleService.delete(params.id);
  }
}
