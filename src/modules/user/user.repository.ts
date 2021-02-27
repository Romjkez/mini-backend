import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { switchMap } from 'rxjs/operators';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { Inject } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(@Inject('SALT_ROUNDS') private readonly saltRounds: number) {
    super();
  }

  saveOne(dto: CreateUserDto): Observable<User> {
    const password = Math.floor(Math.random() * 1000000).toString();

    return from(bcrypt.hash(password, this.saltRounds)).pipe(
      switchMap(hash =>
        from(
          super.save({
            ...dto,
            password: hash,
          } as CreateUserInternalDto),
        ),
      ),
    );
  }
}
