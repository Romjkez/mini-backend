import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';
import { Option } from '../../option/entities/option.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';


@Entity({ name: 'orderQuestionAnswer' })
export class OrderQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OrderQuestionAnswerEntity })
  @OneToMany(() => OrderQuestionEntity, q => q.id)
  question: OrderQuestionEntity;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  answer: Array<Option<OrderQuestionEntity>>;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.orderQuestionAnswers)
  finishedTest: FinishedTest;
}
