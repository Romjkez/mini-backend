import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ValidateUserDto } from './dto/validate-user.dto';
import { from, Observable, of, zip } from 'rxjs';
import { UserRepository } from '../user/user.repository';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from './models/jwt-token.model';
import { JwtFullPayload, JwtPayload } from './models/jwt-payload.model';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository,
              private readonly jwtService: JwtService,
              @InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>,
              private readonly logger: Logger) {
    logger.setContext('AuthService');
  }

  login(dto: ValidateUserDto): Observable<JwtToken> {
    return from(this.userRepo.findOneOrFail({ email: dto.email }))
      .pipe(
        switchMap(user => zip(from(bcrypt.compare(dto.password, user.password)), of(user))),
        switchMap(([result, user]) => {
          if (result) {
            const accessTokenPayload: JwtPayload = { sub: user.id, login: user.email, role: user.role };
            const refreshTokenPayload: JwtPayload = {
              login: user.email,
              role: user.role,
              sub: user.id,
            };

            return zip(
              from(this.jwtService.signAsync(accessTokenPayload)),
              from(this.jwtService.signAsync(refreshTokenPayload,
                { expiresIn: process.env.REFRESH_EXPIRATION })),
              of(refreshTokenPayload),
            );
          }
          throw new UnauthorizedException('Email or password is invalid');
        }),
        switchMap(([access, refresh, refreshPayload]) => {
          const saveRefreshTokenDto = {
            refreshToken: refresh,
            owner: refreshPayload.sub as Partial<UserEntity>,
            expiresAt: new Date((this.jwtService.decode(refresh) as JwtFullPayload).exp * 1000),
          };

          return from(this.refreshTokenRepo.save(saveRefreshTokenDto))
            .pipe(
              catchError(err => {
                console.error(err);
                this.logger.error(err);
                return err;
              }),
              switchMap(() => zip(of(access), of(refresh)),
              ),
            );
        }),
        map(([access, refresh]) => ({ accessToken: access, refreshToken: refresh } as JwtToken)),
      );
  }
}
