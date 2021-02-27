import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map, mapTo } from 'rxjs/operators';
import { EMPTY, from, Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { convertUserToSimpleUser } from './utils/convert-user-to-simple-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
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
    return from(this.userRepo.update(id,{bannedAt: new Date()}))
      .pipe(
        catchError(err => {
          this.logger.error(err);
          throw new InternalServerErrorException(err);
        }),
        mapTo(null),
      );
  }

  delete() {}
}
