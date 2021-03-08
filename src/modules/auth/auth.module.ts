import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { RefreshToken } from './refresh-token.entity';

export const JWT_CONSTANTS = {
  jwtSecret: process.env.JWT_SECRET,
  expirationTime: process.env.JWT_EXPIRATION,
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_CONSTANTS.jwtSecret,
      verifyOptions: {
        algorithms: ['HS512'],
      },
      signOptions: {
        expiresIn: `${JWT_CONSTANTS.expirationTime}s`,
      },
    }), TypeOrmModule.forFeature([UserRepository, RefreshToken])],
  providers: [AuthService, JwtStrategy, Logger],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
