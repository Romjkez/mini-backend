import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { from, Observable, of, zip } from 'rxjs';
import { UserRepository } from '../user/user.repository';
import { map, switchMap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './models/jwt-token.model';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository, private readonly jwtService: JwtService) {
  }

  login(dto: ValidateUserDto): Observable<JwtToken> {
    return from(this.userRepo.findOneOrFail({ email: dto.email }))
      .pipe(
        switchMap(user => zip(from(bcrypt.compare(dto.password, user.password)), of(user))),
        switchMap(([result, user]) => {
          if (result) {
            return from(this.jwtService.signAsync({ sub: user.email, id: user.id, role: user.role }));
          }
          throw new UnauthorizedException('Email or password is invalid');
        }),
        map(token => ({ accessToken: token })),
      );
  }
}
