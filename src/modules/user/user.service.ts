import { Inject, Injectable, InternalServerErrorException, Logger, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { convertUserToSimpleUser } from './utils/convert-user-to-simple-user';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt'
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
    return this.userRepo.saveOne(dto).pipe(
      map(user => convertUserToSimpleUser(user)),
      catchError(err => {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      }),
    );
  }

  createBulk() {}

  update() {}

  activate(id: number): Observable<void> {
    return from(this.userRepo.update(id,{bannedAt: null}))
      .pipe(
        catchError(err => {
          this.logger.error(err);
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  deactivate(id: number): Observable<void> {
    return from(this.userRepo.update(id, { bannedAt: new Date() }))
      .pipe(
        catchError(err => {
          this.logger.error(err);
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  changePassword(id: number, dto: ChangePasswordDto): Observable<void> {
    return from(this.userRepo.findOne({ select: ['password'], where: { id } })).pipe(
      catchError(err => {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      }),
      switchMap((user: Partial<User>) => from(bcrypt.compare(dto.oldPassword, user.password))),
      switchMap(comparisonResult=>{
        if(!comparisonResult) {
          throw new UnprocessableEntityException('Old password is wrong')
        }
        return from(bcrypt.hash(dto.newPassword, this.saltRounds));
      }),
      catchError(err => {
        this.logger.error(err);
        throw new InternalServerErrorException(err);
      }),
      mapTo(null),
    );

  }

  delete() {
  }
}
