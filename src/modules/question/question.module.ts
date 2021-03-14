import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { OneOfQuestionRepository } from './repositories/one-of-question.repository';
import { ManyOfQuestionRepository } from './repositories/many-of-question.repository';
import { ExactAnswerQuestionRepository } from './repositories/exact-answer-question.repository';
import { Option } from '../option/entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OneOfQuestionRepository,
    ManyOfQuestionRepository,
    ExactAnswerQuestionRepository,
    Option,
  ])],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
