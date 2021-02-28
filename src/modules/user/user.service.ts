import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { convertUserToSimpleUser } from './utils/convert-user-to-simple-user';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
    @Inject('SALT_ROUNDS') private readonly saltRounds: number,
    private readonly logger: Logger,
  ) {
    logger.setContext('UserService');
  }

  createOne(dto: CreateUserDto): Observable<SimpleUser> {
    const password = Math.floor(Math.random() * 1000000).toString();

    return this.userRepo.insertOne({ ...dto, password }, this.saltRounds).pipe(
      map(user => convertUserToSimpleUser(user)),
      catchError(err => {
        this.logger.error(err);
        if (err.code === '23505') {
          throw new BadRequestException(
            'User with such an email already exists',
          );
        }
        throw new InternalServerErrorException(err);
      }),
    );
  }

  createBulk() {
  }

  getById(id: number): Observable<User> {
    return from(
      this.userRepo.findOneOrFail(id, {
        relations: ['finishedTests', 'finishedArticles'],
      }),
    ).pipe(tap(user => console.log(user)));
  }

  update() {
  }

  activate(id: number): Observable<void> {
    return from(this.userRepo.update(id, { bannedAt: null })).pipe(
      catchError(err => {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      }),
      mapTo(null),
    );
  }

  deactivate(id: number): Observable<void> {
    return from(this.userRepo.update(id, { bannedAt: new Date() })).pipe(
      catchError(err => {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      }),
      mapTo(null),
    );
  }

  changePassword(id: number, dto: ChangePasswordDto): Observable<void> {
    return from(
      this.userRepo.findOne({ select: ['password'], where: { id } }),
    ).pipe(
      tap(user => {
        if (!user?.password) {
          throw new BadRequestException(`User with ID ${id} was not found`);
        }
      }),
      switchMap((user: Partial<User>) =>
        from(bcrypt.compare(dto.oldPassword, user.password)),
      ),
      switchMap(comparisonResult => {
        if (!comparisonResult) {
          throw new BadRequestException('Old password is wrong');
        }
        return from(bcrypt.hash(dto.newPassword, this.saltRounds));
      }),
      switchMap(hash => from(this.userRepo.update(id, { password: hash }))),
      mapTo(null),
    );
  }

  delete() {}
}
