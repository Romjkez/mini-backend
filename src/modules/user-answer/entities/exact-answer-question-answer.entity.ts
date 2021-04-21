import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { FinishedTest } from '../../finished-test/finished-test.entity';
import { ExactAnswerQuestion } from '../../question/entities/exact-answer-question.entity';


@Entity({ name: 'exactAnswerQuestionAnswer' })
export class ExactAnswerQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: ExactAnswerQuestion, isArray: true })
  @OneToMany(() => ExactAnswerQuestion, q => q.id)
  question: ExactAnswerQuestion;

  @ApiModelProperty({ type: 'string' })
  answer: string;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToMany(() => FinishedTest, test => test.exactAnswerQuestionAnswer)
  finishedTest: FinishedTest;
}
