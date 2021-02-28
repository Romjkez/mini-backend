import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
    @Inject('SALT_ROUNDS') private readonly saltRounds: number,
    private readonly logger: Logger,
  ) {
    logger.setContext('UserService');
  }

  createOne(dto: CreateUserDto): Observable<User> {
    const password = this.generatePassword();

    return this.userRepo.insertOne({ ...dto, password }, this.saltRounds)
      .pipe(
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
    return from(this.userRepo.findOneOrFail(id, { relations: ['finishedTests', 'finishedArticles'] }))
      .pipe(
        map((user: UserEntity & UserEntityRelations) => convertUserEntityToUser(user)),
      );
  }

  async getMany(dto: GetManyUsersDto): Promise<Array<any>> {
    const entityName = 'user';
    let qb = this.userRepo.createQueryBuilder(entityName)
      .limit(dto?.perPage || 15)
      .offset(dto?.perPage * (dto?.page - 1) || 0);

    if (dto.sort) {
      qb = addUserSort(qb, dto.sort, entityName);
    } else {
      qb = qb.addOrderBy(`"${entityName}"."createdAt"`, SortType.DESC);
    }

    if (dto.filter) {
      qb = addUserFilter(qb, dto.filter, entityName);
    }
    const res = await qb.getManyAndCount();
    return res;
  }

  update(id: number, dto: UpdateUserDto): Observable<User> {
    return from(this.userRepo.update(id, dto))
      .pipe(
        switchMap(() => from(this.userRepo.findOne(id, { relations: ['finishedArticles', 'finishedTests'] }))),
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

  private generatePassword(): string {
    return Math.floor(Math.random() * 1000000).toString();
  }
}
