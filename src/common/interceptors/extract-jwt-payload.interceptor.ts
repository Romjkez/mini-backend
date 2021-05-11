import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtFullPayload } from '../../modules/auth/models/jwt-payload.model';

/**
 * Extracts JWT payload from Authorization header and appends its data to query/body
 */
@Injectable()
export class ExtractJwtPayloadInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new UnauthorizedException('NO_TOKEN_FOUND');
    }
    const payload = this.jwtService.decode(token) as JwtFullPayload;
    if (req.method === 'GET') {
      req.query = Object.assign(req.query, { sub: payload.sub, login: payload.login, role: payload.role });
    } else {
      req.body = Object.assign(req.body, { sub: payload.sub, login: payload.login, role: payload.role });
    }

    return next.handle();
  }
}
