import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { switchMap } from 'rxjs/operators';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  insertOne(dto: CreateUserInternalDto, saltRounds: number): Observable<UserEntity> {
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
