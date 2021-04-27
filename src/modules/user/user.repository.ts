import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { forkJoin, from, Observable, of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { map, switchMap } from 'rxjs/operators';
import { CreateUserInternalDto } from './dto/create-user-internal.dto';
import { USER_RELATIONS } from './user.service';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /**
   * Insert one user and hash his password
   * @param dto
   * @param saltRounds
   */
  insertOne(dto: CreateUserInternalDto, saltRounds: number): Observable<UserEntity> {
    return from(bcrypt.hash(dto.password, saltRounds))
      .pipe(
        switchMap(hash => from(super.save({ ...dto, password: hash }))),
        switchMap(user =>
          from(this.findOne(user.id, { relations: USER_RELATIONS }))),
      );
  }

  /**
   * Insert many users and hash their passwords
   * @param dto
   * @param saltRounds
   */
  insertMany(dto: Array<CreateUserInternalDto>, saltRounds: number): Observable<Array<UserEntity>> {
    return of(dto)
      .pipe(
        switchMap(dto => forkJoin(dto.map(async userData => {
          const hashedPass = await bcrypt.hash(userData.password, saltRounds);

          return { ...userData, password: hashedPass };
        }))),
        switchMap(dto => from(super.save(dto, { chunk: 5000 }))),
        map(users => users.map(user => user.id)),
        switchMap(usersIds => from(super.findByIds(usersIds, { relations: USER_RELATIONS }))),
      );
  }
}
