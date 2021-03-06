import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswer } from './user-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswer])],
  providers: [UserAnswerService],
})
export class UserAnswerModule {}
