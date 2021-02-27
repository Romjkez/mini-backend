import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { switchMap } from 'rxjs/operators';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  saveOne(dto: CreateUserInternalDto, saltRounds: number): Observable<User> {
    return from(bcrypt.hash(dto.password, saltRounds)).pipe(
      switchMap(hash =>
        from(
          super.save({
            ...dto,
            password: hash,
          }),
        ),
      ),
    );
  }
}
