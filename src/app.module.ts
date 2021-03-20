import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './modules/question/question.module';
import { TestModule } from './modules/test/test.module';
import { FinishedTest } from './modules/finished-test/finished-test.entity';
import { OptionModule } from './modules/option/option.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserAnswerModule } from './modules/user-answer/user-answer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ArticleModule,
    QuestionModule,
    TestModule,
    FinishedTest,
    OptionModule,
    AuthModule,
    UserAnswerModule,
    ScheduleModule.forRoot(),
    ExerciseModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
