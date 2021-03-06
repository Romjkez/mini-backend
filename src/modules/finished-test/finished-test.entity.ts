import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from '../user/user.entity';
import { Test } from '../test/test.entity';
import { OneOfQuestionAnswerEntity } from '../user-answer/entities/one-of-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from '../user-answer/entities/many-of-question-answer.entity';
import { OrderQuestionAnswerEntity } from '../user-answer/entities/order-question-answer.entity';
import { ExactAnswerQuestionAnswerEntity } from '../user-answer/entities/exact-answer-question-answer.entity';

@Entity({ name: 'finishedTest' })
export class FinishedTest {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, user => user.finishedTests)
  finishedBy: UserEntity;

  @ApiModelProperty({ type: OneOfQuestionAnswerEntity, isArray: true })
  @OneToMany(() => OneOfQuestionAnswerEntity, answer => answer.finishedTest, { cascade: true, onDelete: 'CASCADE' })
  oneOfQuestionAnswers: Array<OneOfQuestionAnswerEntity>;

  @ApiModelProperty({ type: ManyOfQuestionAnswerEntity, isArray: true })
  @OneToMany(() => ManyOfQuestionAnswerEntity, answer => answer.finishedTest, { cascade: true, onDelete: 'CASCADE' })
  manyOfQuestionAnswers: Array<ManyOfQuestionAnswerEntity>;

  @ApiModelProperty({ type: OrderQuestionAnswerEntity, isArray: true })
  @OneToMany(() => OrderQuestionAnswerEntity, answer => answer.finishedTest, { cascade: true, onDelete: 'CASCADE' })
  orderQuestionAnswers: Array<OrderQuestionAnswerEntity>;

  @ApiModelProperty({ type: ExactAnswerQuestionAnswerEntity, isArray: true })
  @OneToMany(() => ExactAnswerQuestionAnswerEntity, answer => answer.finishedTest, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  exactAnswerQuestionAnswers: Array<ExactAnswerQuestionAnswerEntity>;

  @ApiModelProperty({ type: Test })
  @ManyToOne(() => Test, test => test.id)
  test: Test;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  finishedAt: Date;

  @ApiModelProperty({ readOnly: true })
  @Column({ type: 'real' })
  result: number;

  @ApiModelProperty({ readOnly: true })
  @Column({ type: 'smallint' })
  correctAnswers: number;
}
