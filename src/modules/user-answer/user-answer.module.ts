import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OneOfQuestionAnswerEntity } from './entities/one-of-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from './entities/many-of-question-answer.entity';
import { OrderQuestionAnswerEntity } from './entities/order-question-answer.entity';
import { ExactAnswerQuestionAnswerEntity } from './entities/exact-answer-question-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OneOfQuestionAnswerEntity,
    ManyOfQuestionAnswerEntity,
    OrderQuestionAnswerEntity,
    ExactAnswerQuestionAnswerEntity,
  ])],
  providers: [UserAnswerService],
})
export class UserAnswerModule {}
