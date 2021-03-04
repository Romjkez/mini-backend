import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from './auth.module';
import { JwtPayload } from './models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANTS.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log(payload);
    return { userId: payload.sub, email: payload.login };
  }
}
