import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as crypto from 'crypto';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

export const JWT_CONSTANTS = {
  jwtSecret: crypto.randomBytes(64).toString('hex'),
  expirationTime: process.env.JWT_EXPIRATION,
};

@Module({
  imports: [JwtModule.register({
    secret: JWT_CONSTANTS.jwtSecret,
    verifyOptions: {
      algorithms: ['HS512'],
    },
    signOptions: {
      expiresIn: JWT_CONSTANTS.expirationTime,
    },
  }), TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
