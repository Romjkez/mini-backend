import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from "./user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, Logger,
    {
      provide: 'SALT_ROUNDS',
      useValue: 8
    }],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
