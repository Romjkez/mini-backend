import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtFullPayload } from '../../modules/auth/models/jwt-payload.model';
import { Reflector } from '@nestjs/core';

@Injectable()
export class HasRolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
              private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (!token) {
      throw new UnauthorizedException('NO_TOKEN_PROVIDED');
    }
    const userRole = (this.jwtService.decode(token) as JwtFullPayload).role;
    const requiredRoles = this.reflector.get<Array<string>>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.includes(userRole);
  }
}
