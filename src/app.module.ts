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
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.NODE_ENV,
      entities:
        process.env.NODE_ENV === 'production'
          ? [`${__dirname}/modules/**/*.entity{.ts,.js}`]
          : ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
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
