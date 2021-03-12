import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SingleOptionQuestionRepository } from './repositories/single-option-question.repository';
import { MultiOptionQuestionRepository } from './repositories/multi-option-question.repository';
import { ExactAnswerQuestionRepository } from './repositories/exact-answer-question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    SingleOptionQuestionRepository,
    MultiOptionQuestionRepository,
    ExactAnswerQuestionRepository,
  ])],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
