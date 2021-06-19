import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';
import { Observable } from 'rxjs';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { Article } from './models/article.model';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';
import { IsCreateArticleValidPipe } from './pipes/is-create-article-valid.pipe';

@ApiTags('article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {
  }

  @ApiCreatedResponse({ type: Article })
  @UsePipes(IsCreateArticleValidPipe)
  @Post()
  createOne(@Body() dto: CreateArticleDto): Observable<Article> {
    return this.articleService.createOne(dto);
  }

  @ApiOkResponse({ type: Article })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get(':id')
  getById(@Param() params: IdDto, @Query() payload: ExtractedJwtPayload): Observable<Article> {
    return this.articleService.getById(params.id, payload.jwtPayload);
  }

  // Made POST method for swagger ui (no need to describe each query param in decorator)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @ApiBody({ type: GetManyArticlesDto })
  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyArticlesDto & ExtractedJwtPayload): Observable<GetManyResponseDto<Article>> {
    return this.articleService.getMany(dto);
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

  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: UpdateArticleDto): Observable<Article> {
    return this.articleService.update(params.id, dto);
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.articleService.delete(params.id);
  }
}
