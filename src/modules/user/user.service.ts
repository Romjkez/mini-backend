import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { convertUserEntityToUser, UserEntityRelations } from './utils/convert-user-entity-to-user';
import { User } from './models/user.model';
import { CreateUserBulkDto } from './dto/create-user-bulk.dto';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUsersDto } from './dto/get-many-users.dto';
import { SortType } from '../../common/models/sort-type.enum';
import { addUserFilter } from './utils/add-user-filter';
import { addUserSort } from './utils/add-user-sort';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, GetManyDto } from '../../common/dto/get-many.dto';
import { SimpleUser } from './models/simple-user.model';
import { convertUserEntityToSimpleUser } from './utils/convert-user-entity-to-simple-user';
import { MailerService } from '@nestjs-modules/mailer';
import { getPlainWelcomeText, getWelcomeText } from '../../templates/welcome';
import { calculateQueryOffset } from '../../common/utils';

import { ArticleEntity } from '../article/article.entity';
import { Test } from '../test/test.entity';
import { AddFinishedArticleDto } from './dto/add-finished-article.dto';
import { AddFavoriteArticleDto } from './dto/add-favorite-article.dto';
import { RemoveFavoriteArticleDto } from './dto/remove-favorite-article.dto';

export const USER_RELATIONS: Array<string> = ['finishedTests', 'finishedArticles', 'favoriteArticles'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
    @Inject('SALT_ROUNDS') private readonly saltRounds: number,
    private readonly logger: Logger,
    private readonly mailerService: MailerService,
  ) {
    logger.setContext('UserService');
  }

  createOne(dto: CreateUserDto): Observable<User> {
    const password = this.generatePassword();
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`${dto.email}:${password}`);
    }

    return this.userRepo.insertOne({ ...dto, password }, this.saltRounds)
      .pipe(
        map((user: UserEntity & UserEntityRelations) => convertUserEntityToUser(user)),
        tap(async () => this.mailerService.sendMail({
          from: `"${process.env.APP_NAME}" <${process.env.MAIL_USER}>`,
          to: dto.email,
          subject: `Добро пожаловать в ${process.env.APP_NAME}!`,
          html: getWelcomeText({ email: dto.email, password }),
          text: getPlainWelcomeText({ email: dto.email, password }),
        })),
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          if (err.code === '23505') {
            throw new BadRequestException('User with such an email already exists');
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }

  createBulk(dto: CreateUserBulkDto): Observable<Array<User>> {
    const users: Array<CreateUserInternalDto> = dto.data.map(userData => ({
      ...userData,
      password: this.generatePassword(),
    }));

    return this.userRepo.insertMany(users, this.saltRounds)
      .pipe(
        map((users: Array<UserEntity & UserEntityRelations>) => users.map(user => convertUserEntityToUser(user))),
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          if (err.code === '23505') {
            throw new BadRequestException(
              'User with one of given emails already exists',
            );
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }

  getById(id: number): Observable<User> {
    const qb = this.userRepo.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .loadRelationCountAndMap('user.finishedTests', 'user.finishedTests')
      .loadRelationCountAndMap('user.finishedArticles', 'user.finishedArticles')
      .loadRelationCountAndMap('user.favoriteArticles', 'user.favoriteArticles');

    return from(qb.getOne())
      .pipe(
        map(user => {
          if (user === undefined) {
            throw new NotFoundException();
          }
          return user;
        }),
        map((user: UserEntity & UserEntityRelations) => convertUserEntityToUser(user)),
      );
  }

  getFinishedArticles(id: number, dto: GetManyDto): Observable<Array<ArticleEntity>> {
    throw new NotImplementedException();
  }

  getFinishedTests(id: number, dto: GetManyDto): Observable<Array<Test>> {
    throw new NotImplementedException();
  }

  getFavoriteArticles(id: number, dto: GetManyDto): Observable<Array<ArticleEntity>> {
    throw new NotImplementedException();
  }

  getByEmail(email: string): Observable<User> {
    return from(this.userRepo.findOneOrFail({ email }, { relations: USER_RELATIONS }))
      .pipe(
        map((user: UserEntity & UserEntityRelations) => convertUserEntityToUser(user)),
      );
  }

  getMany(dto: GetManyUsersDto): Observable<GetManyResponseDto<SimpleUser>> {
    const entityName = 'user';
    let qb = this.userRepo.createQueryBuilder(entityName)
      .limit(dto?.perPage || DEFAULT_PER_PAGE)
      .offset(calculateQueryOffset(dto?.perPage, dto?.page));

    if (dto.sort) {
      qb = addUserSort(qb, dto.sort, entityName);
    } else {
      qb = qb.addOrderBy(`"${entityName}"."createdAt"`, SortType.DESC);
    }

    if (dto.filter) {
      qb = addUserFilter(qb, dto.filter, entityName);
    }
    return from(qb.getManyAndCount())
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        map(res => {
          return {
            data: res[0].map((user: UserEntity & UserEntityRelations) => convertUserEntityToSimpleUser(user)),
            perPage: dto?.perPage || DEFAULT_PER_PAGE,
            page: dto?.page || DEFAULT_PAGE,
            totalItems: res[1],
          };
        }),
      );
  }

  update(id: number, dto: UpdateUserDto): Observable<User> {
    return from(this.userRepo.update(id, dto))
      .pipe(
        switchMap(() => from(this.userRepo.findOne(id, { relations: USER_RELATIONS }))),
        map((user: UserEntity & UserEntityRelations) => convertUserEntityToUser(user)),
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          if (err.code === '23505') {
            throw new BadRequestException('User with such an email already exists');
          }
          throw new InternalServerErrorException(err);
        }),
      );
  }

  activate(id: number): Observable<void> {
    // TODO: check if user already activated and throw error
    return from(this.userRepo.update(id, { bannedAt: null }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  deactivate(id: number): Observable<void> {
    // TODO: check if user already deactivated and throw error
    return from(this.userRepo.update(id, { bannedAt: new Date() }))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  changePassword(id: number, dto: ChangePasswordDto): Observable<void> {
    return from(this.userRepo.findOne({ select: ['password'], where: { id } }))
      .pipe(
        tap(user => {
          if (!user?.password) {
            throw new BadRequestException(`User with ID ${id} was not found`);
          }
        }),
        switchMap((user: Partial<UserEntity>) => from(bcrypt.compare(dto.oldPassword, user.password))),
        switchMap(comparisonResult => {
          if (!comparisonResult) {
            throw new Error('Old password is wrong');
          }
          return from(bcrypt.hash(dto.newPassword, this.saltRounds));
        }),
        switchMap(hash => from(this.userRepo.update(id, { password: hash }))),
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }

  addFinishedArticle(dto: AddFinishedArticleDto): Observable<void> {
    const qb = this.userRepo.createQueryBuilder()
      .relation('finishedArticles')
      .of(dto.userId);

    return from(qb.add(dto.articleId))
      .pipe(
        catchError(err => {
          if (err?.code === '23505') {
            return of();
          }
          console.log(err);
          this.logger.error(err);
          if (err?.code == '23503') {
            throw new BadRequestException('One of or both IDs represent not existing entities');
          }
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  addFavoriteArticle(dto: AddFavoriteArticleDto): Observable<void> {
    const qb = this.userRepo.createQueryBuilder()
      .relation('favoriteArticles')
      .of(dto.userId);

    return from(qb.add(dto.articleId))
      .pipe(
        catchError(err => {
          if (err?.code === '23505') {
            return of();
          }
          console.log(err);
          this.logger.error(err);
          if (err?.code == '23503') {
            throw new BadRequestException('One of or both IDs represent not existing entities');
          }
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  removeFavoriteArticle(dto: RemoveFavoriteArticleDto): Observable<void> {
    const qb = this.userRepo.createQueryBuilder()
      .relation('favoriteArticles')
      .of(dto.userId);

    // TODO: check of relation exists before deletion (now no errors)
    return from(qb.remove(dto.articleId))
      .pipe(
        catchError(err => {
          console.log(err);
          this.logger.error(err);
          if (err?.code == '23503') {
            throw new BadRequestException('One of or both IDs represent not existing entities');
          }
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  private generatePassword(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
