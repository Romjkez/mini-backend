import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './modules/question/question.module';
import { TestModule } from './modules/test/test.module';
import { OptionModule } from './modules/option/option.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserAnswerModule } from './modules/user-answer/user-answer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { TagModule } from './modules/tag/tag.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { FinishedTestModule } from './modules/finished-test/finished-test.module';
import { FinishedExerciseModule } from './modules/finished-exercise/finished-exercise.module';
import { NewsModule } from './modules/news/news.module';
import { StatsModule } from './modules/stats/stats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ArticleModule,
    QuestionModule,
    TestModule,
    FinishedTestModule,
    OptionModule,
    AuthModule,
    UserAnswerModule,
    ScheduleModule.forRoot(),
    ExerciseModule,
    TagModule,
    MailerModule.forRoot({
      transport: `smtp://${process.env.MAIL_USER}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
    }),
    ConfigModule,
    FinishedExerciseModule,
    NewsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
