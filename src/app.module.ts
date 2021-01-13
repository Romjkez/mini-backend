import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './modules/question/question.module';
import { TestModule } from './modules/test/test.module';
import { FinishedTest } from './modules/finished-test/finished-test.entity';
import { OptionModule } from './modules/option/option.module';

@Module({
  imports: [
    // TODO: uncomment when db config is ready
    // DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: 'mini-test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UserModule,
    ArticleModule,
    QuestionModule,
    TestModule,
    FinishedTest,
    OptionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
