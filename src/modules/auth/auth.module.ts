import { Global, Logger, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { RefreshToken } from './refresh-token.entity';
import { TaskService } from './services/task.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      verifyOptions: {
        algorithms: ['HS512'],
      },
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
        algorithm: 'HS512',
      },
    }), TypeOrmModule.forFeature([UserRepository, RefreshToken])],
  providers: [AuthService, JwtStrategy, Logger, TaskService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
