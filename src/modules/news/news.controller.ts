import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { NewsService } from './news.service';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';
import { IdDto } from '../../common/dto/id.dto';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { GetManyNewsDto } from './dto/get-many-news.dto';


@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {
  }

  @ApiCreatedResponse({ type: NewsEntity })
  @Post()
  createOne(@Body() dto: CreateNewsDto): Observable<NewsEntity> {
    return this.newsService.createOne(dto);
  }

  @ApiOkResponse({ type: NewsEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get(':id')
  getById(@Param() params: IdDto, @Query() payload: ExtractedJwtPayload): Observable<NewsEntity> {
    return this.newsService.getById(params.id);
  }

  // Made POST method for swagger ui (no need to describe each query param in decorator)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @ApiBody({ type: GetManyNewsDto })
  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyNewsDto & ExtractedJwtPayload): Observable<GetManyResponseDto<NewsEntity>> {
    return this.newsService.getMany(dto);
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.newsService.remove(params.id);
  }
}
