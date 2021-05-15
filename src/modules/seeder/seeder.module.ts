import { Logger, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { Seeder } from './seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../article/article.module';
import { AuthModule } from '../auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ArticleModule,
    AuthModule,
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAIL_USER}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
    }),
  ],
  providers: [Seeder, Logger],
})
export class SeederModule {}
