import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidateUserDto } from '../dto/validate-user.dto';
import { from, Observable, of, zip } from 'rxjs';
import { UserRepository } from '../../user/user.repository';
import { catchError, map, mapTo, switchMap, tap } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../models/jwt-token.model';
import { JwtFullPayload, JwtPayload } from '../models/jwt-payload.model';
import { Repository } from 'typeorm';
import { RefreshToken } from '../refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/user.entity';
import { StatsCountResponseDto } from '../../stats/dto/stats-count-response.dto';

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
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          if (err?.name === 'EntityNotFound') {
            throw new UnauthorizedException('USER_NOT_FOUND');
          }
          throw new UnauthorizedException(err);
        }),
        map(user => {
          if (user.bannedAt !== null) {
            throw new ForbiddenException('USER_DEACTIVATED');
          }
          return user;
        }),
        switchMap(user => zip(from(bcrypt.compare(dto.password, user.password)), of(user))),
        switchMap(([passwordValid, user]) => this.generateJwtToken(passwordValid, user)),
      );
  }

  refresh(refreshToken: string): Observable<JwtToken> {
    return from(this.jwtService.verifyAsync(refreshToken))
      .pipe(
        catchError(err => {
          this.logger.error(JSON.stringify(err, null, 2));
          throw new UnauthorizedException();
        }),
        switchMap((payload: JwtFullPayload) => this.generateJwtToken(true, {
          id: payload.sub,
          email: payload.login,
          role: payload.role,
        } as Partial<UserEntity>)),
        tap(async () => await this.refreshTokenRepo.delete({ refreshToken })),
      );
  }

  /**
   * Finish current user session
   * @param token
   */
  logout(token: string): Observable<void> {
    return from(this.refreshTokenRepo.delete({ refreshToken: token }))
      .pipe(
        mapTo(null),
      );
  }

  /**
   * Finish all user sessions
   * @param userId
   */
  resetRefreshTokens(userId: number): Observable<void> {
    return from(this.refreshTokenRepo.delete({ owner: { id: userId } }))
      .pipe(
        mapTo(null),
      );
  }

  getLoginStats(): Observable<StatsCountResponseDto> {
    return from(this.refreshTokenRepo.query('SELECT count(DISTINCT "refreshTokens"."ownerId") from "refreshTokens";'))
      .pipe(
        map(res => res[0]),
      );

  }

  private generateJwtToken(isAuthorized: boolean, user: Partial<UserEntity>): Observable<JwtToken> {
    return zip(of(isAuthorized), of(user))
      .pipe(
        switchMap(([passwordValid, user]) => {
          if (passwordValid) {
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
              of(refreshTokenPayload.sub),
            );
          }
          throw new UnauthorizedException('INVALID_CREDENTIALS');
        }),
        switchMap(([access, refresh, userId]) => {
          const saveRefreshTokenDto = {
            refreshToken: refresh,
            owner: userId as Partial<UserEntity>,
            expiresAt: new Date((this.jwtService.decode(refresh) as JwtFullPayload).exp * 1000),
          };

          return from(this.refreshTokenRepo.save(saveRefreshTokenDto))
            .pipe(
              catchError(err => {
                this.logger.error(JSON.stringify(err, null, 2));
                throw new InternalServerErrorException('Error while saving refresh token');
              }),
              switchMap(() => zip(of(access), of(refresh)),
              ),
            );
        }),
        map(([access, refresh]) => ({ accessToken: access, refreshToken: refresh } as JwtToken)),
      );
  }
}
