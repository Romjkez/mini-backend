import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { Option } from '../../option/entities/option.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

/**
 * Answer to "Many of" question
 */
@Entity({ name: 'manyOfQuestionAnswer' })
export class ManyOfQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: ManyOfQuestionAnswerEntity })
  @ManyToOne(() => ManyOfQuestionEntity, { eager: true })
  question: ManyOfQuestionEntity;

  @ApiModelProperty({ type: Option, isArray: true })
  @ManyToMany(() => Option, option => option.answer, { eager: true })
  @JoinTable()
  answer: Array<Option<ManyOfQuestionEntity>>;

  @ApiModelProperty({ type: 'boolean', readOnly: true })
  @Column({ type: 'boolean', nullable: false, readonly: true })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.manyOfQuestionAnswers)
  finishedTest: FinishedTest;
}
