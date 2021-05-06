import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';
import { Option } from '../../option/entities/option.entity';

/**
 * Answer to "One of" question
 */
@Entity({ name: 'oneOfQuestionAnswer' })
export class OneOfQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OneOfQuestionEntity })
  @ManyToOne(() => OneOfQuestionEntity, { eager: true })
  question: OneOfQuestionEntity;

  @ApiModelProperty({ type: Option })
  @ManyToOne(() => Option, { eager: true })
  @JoinColumn()
  answer: Option<OneOfQuestionEntity>;

  @ApiModelProperty({ type: 'boolean', readOnly: true })
  @Column({ type: 'boolean', nullable: false, readonly: true })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.oneOfQuestionAnswers)
  finishedTest: FinishedTest;
}
