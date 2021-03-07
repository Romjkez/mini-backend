import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleOptionQuestion } from './entities/single-option-question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MultiOptionQuestion } from './entities/multi-option-question.entity';
import { ExactAnswerQuestion } from './entities/exact-answer-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SingleOptionQuestion, MultiOptionQuestion, ExactAnswerQuestion])],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
