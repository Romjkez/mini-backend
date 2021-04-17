import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';
import { Observable } from 'rxjs';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { Article } from './models/article.model';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { AddFinishedByDto } from './dto/add-finished-by.dto';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @ApiCreatedResponse({ type: Article })
  @Post()
  createOne(@Body() dto: CreateArticleDto): Observable<Article> {
    return this.articleService.createOne(dto);
  }

  @ApiOkResponse({ type: Article })
  @Get(':id')
  getById(@Param() params: IdDto): Observable<Article> {
    return this.articleService.getById(params.id);
  }

  @ApiOkResponse({ type: null, description: 'No response body expected' })
  @Post(':articleId/finishedBy/:userId')
  @HttpCode(200)
  addFinishedBy(@Param() dto: AddFinishedByDto) {
    return this.articleService.addFinishedBy(dto);
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
  getMany(@Body() dto: GetManyArticlesDto): Observable<GetManyResponseDto<Article>> {
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
