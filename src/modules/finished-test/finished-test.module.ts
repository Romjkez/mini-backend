import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTestService } from './finished-test.service';
import { FinishedTestController } from './finished-test.controller';
import { FinishedTestRepository } from './finished-test.repository';
import { TestModule } from '../test/test.module';
import { ExactAnswerQuestionAnswerEntity } from '../user-answer/entities/exact-answer-question-answer.entity';
import { OrderQuestionAnswerEntity } from '../user-answer/entities/order-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from '../user-answer/entities/many-of-question-answer.entity';
import { OneOfQuestionAnswerEntity } from '../user-answer/entities/one-of-question-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    FinishedTestRepository,
    ExactAnswerQuestionAnswerEntity,
    OrderQuestionAnswerEntity,
    ManyOfQuestionAnswerEntity,
    OneOfQuestionAnswerEntity,
  ]), TestModule],
  providers: [FinishedTestService, Logger],
  controllers: [FinishedTestController],
  exports: [FinishedTestService],
})
export class FinishedTestModule {}
