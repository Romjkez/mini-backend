import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    ArticleModule,
  ],
  providers: [UserService, Logger,
    {
      provide: 'SALT_ROUNDS',
      useValue: 8,
    }],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
