import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { convertUserToSimpleUser } from './utils/convert-user-to-simple-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
    private logger: Logger,
  ) {
    logger.setContext('UserService');
  }

  createOne(dto: CreateUserDto): Observable<SimpleUser> {
    return this.userRepo.saveOne(dto).pipe(
      map(user => convertUserToSimpleUser(user)),
      catchError(err => {
        this.logger.log(err);
        throw new InternalServerErrorException(err);
      }),
    );
  }

  createBulk() {}

  update() {}

  activate() {}

  deactivate() {}

  delete() {}
}
