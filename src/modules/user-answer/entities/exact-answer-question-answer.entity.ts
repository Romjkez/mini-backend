import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { FinishedTest } from '../../finished-test/finished-test.entity';
import { ExactAnswerQuestion } from '../../question/entities/exact-answer-question.entity';


@Entity({ name: 'exactAnswerQuestionAnswer' })
export class ExactAnswerQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: ExactAnswerQuestion, isArray: true })
  @ManyToOne(() => ExactAnswerQuestion, { eager: true })
  question: ExactAnswerQuestion;

  @ApiModelProperty({ type: 'string', nullable: false })
  @Column({ type: 'varchar', nullable: false })
  answer: string;

  @ApiModelProperty({ type: 'boolean', readOnly: true })
  @Column({ type: 'boolean', nullable: false, readonly: true })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.exactAnswerQuestionAnswer)
  finishedTest: FinishedTest;
}
