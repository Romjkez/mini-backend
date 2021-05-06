import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';
import { Option } from '../../option/entities/option.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

/**
 * Answer to "Order" question
 */
@Entity({ name: 'orderQuestionAnswer' })
export class OrderQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OrderQuestionAnswerEntity })
  @ManyToOne(() => OrderQuestionEntity, { eager: true })
  question: OrderQuestionEntity;

  @ApiModelProperty({ type: Option, isArray: true })
  @ManyToMany(() => Option, option => option.answer, { eager: true })
  @JoinTable()
  answer: Array<Option<OrderQuestionEntity>>;

  @ApiModelProperty({ type: 'boolean', readOnly: true })
  @Column({ type: 'boolean', nullable: false, readonly: true })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.orderQuestionAnswers)
  finishedTest: FinishedTest;
}
