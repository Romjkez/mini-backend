import { Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

  @ApiParam({ type: Number, name: 'id' })
  @Get(':id')
  getById(@Param() params: IdDto) {
    return this.articleService.getById(params.id);
  }

  @ApiParam({ type: Number, name: 'id' })
  @Post(':id/hide')
  @HttpCode(200)
  hide(@Param() params: IdDto): Observable<void> {
    return this.articleService.hide(params.id);
  }

  @ApiParam({ type: Number, name: 'id' })
  @Post(':id/show')
  @HttpCode(200)
  show(@Param() params: IdDto): Observable<void> {
    return this.articleService.show(params.id);
  }

  @Post('getMany')
  @HttpCode(200)
  getMany() {
  }

  @ApiParam({ type: Number, name: 'id' })
  @Put(':id')
  update(@Param() params: IdDto) {
  }

  @ApiParam({ type: Number, name: 'id' })
  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.articleService.delete(params.id);
  }
}
