import {
  BadRequestException,
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
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IdDto } from '../../common/dto/id.dto';
import { User } from './models/user.model';
import { CreateUserBulkDto } from './dto/create-user-bulk.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUsersDto } from './dto/get-many-users.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleUser } from './models/simple-user.model';
import { GetManyQueryDto } from '../../common/dto/get-many.dto';
import { AddFavoriteArticleDto } from './dto/add-favorite-article.dto';
import { AddFinishedArticleDto } from './dto/add-finished-article.dto';
import { RemoveFavoriteArticleDto } from './dto/remove-favorite-article.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserSortDto } from './dto/user-sort.dto';
import { SortType } from '../../common/models/sort-type.enum';
import { Article } from '../article/models/article.model';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';
import { JwtPayload } from '../auth/models/jwt-payload.model';
import { HasRolesGuard } from '../../common/guards/has-roles-guard.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';

// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth('bearer')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() dto: CreateUserDto): Observable<User> {
    return this.userService.createOne(dto);
  }

  @Post('/bulk')
  @ApiCreatedResponse({ type: User, isArray: true })
  createBulk(@Body() dto: CreateUserBulkDto): Observable<Array<User>> {
    return this.userService.createBulk(dto);
  }

  @Get('top')
  getTopList(@Query() dto: GetManyQueryDto) {
    const filter: UserFilterDto = { isPrivate: false, rating: true };
    const sort: UserSortDto = { rating: SortType.DESC };
    const finalDto: GetManyUsersDto = { filter, sort, page: dto?.page, perPage: dto?.perPage };
    return this.userService.getMany(finalDto);
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  getById(@Param() params: IdDto): Observable<User> {
    return this.userService.getById(params.id);
  }

  // Made POST method for swagger ui (no need to describe each query param in decorator)
  @ApiOkResponse({ type: GetManyResponseDto })
  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyUsersDto): Observable<GetManyResponseDto<SimpleUser>> {
    return this.userService.getMany(dto);
  }

  @Put(':id/password')
  changePassword(@Param() params: IdDto, @Body() body: ChangePasswordDto): Observable<void> {
    if (body.oldPassword === body.newPassword) {
      throw new BadRequestException('Old and new passwords must not be equal');
    }
    return this.userService.changePassword(params.id, body).pipe(
    );
  }

  @ApiOkResponse({ type: User })
  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: UpdateUserDto): Observable<User> {
    return this.userService.update(params.id, dto);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), HasRolesGuard)
  @Post(':id/activate')
  @HttpCode(200)
  activate(@Param() params: IdDto): Observable<void> {
    return this.userService.activate(params.id);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), HasRolesGuard)
  @ApiOperation({ summary: 'Restrict user to sign-in, delete all refresh tokens' })
  @Post(':id/deactivate')
  @HttpCode(200)
  deactivate(@Param() params: IdDto): Observable<void> {
    return this.userService.deactivate(params.id);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), HasRolesGuard)
  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.userService.delete(params.id);
  }

  @ApiOkResponse({ type: null, description: 'No response body expected' })
  @Post(':userId/articles/finished/:articleId')
  @HttpCode(200)
  addFinishedArticle(@Param() dto: AddFinishedArticleDto) {
    return this.userService.addFinishedArticle(dto);
  }

  @ApiOkResponse({ type: null, description: 'No response body expected' })
  @Post(':userId/articles/favorite/:articleId')
  @HttpCode(200)
  addFavoriteArticle(@Param() dto: AddFavoriteArticleDto): Observable<void> {
    return this.userService.addFavoriteArticle(dto);
  }

  @ApiOkResponse({ type: null, description: 'No response body expected' })
  @HttpCode(200)
  @Delete(':userId/articles/favorite/:articleId')
  removeFavoriteArticle(@Param() dto: RemoveFavoriteArticleDto): Observable<void> {
    return this.userService.removeFavoriteArticle(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get('articles/finished')
  getFinishedArticles(@Query() dto: GetManyQueryDto,
                      @Query('jwtPayload') jwtPayload: JwtPayload): Observable<Array<Article>> {
    return this.userService.getFinishedArticles(dto, jwtPayload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get('articles/favorite')
  getFavoriteArticles(@Query() dto: GetManyQueryDto,
                      @Query('jwtPayload') jwtPayload: JwtPayload): Observable<Array<Article>> {
    return this.userService.getFavoriteArticles(dto, jwtPayload);
  }

}
