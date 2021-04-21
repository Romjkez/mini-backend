import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneOfQuestionAnswer } from './one-of-question-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OneOfQuestionAnswer])],
  providers: [UserAnswerService],
})
export class UserAnswerModule {}
