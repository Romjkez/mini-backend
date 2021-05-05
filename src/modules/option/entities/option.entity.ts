import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';
import { BaseOption } from '../models/base-option.model';
import { OrderQuestionAnswerEntity } from '../../user-answer/entities/order-question-answer.entity';
import { ManyOfQuestionAnswerEntity } from '../../user-answer/entities/many-of-question-answer.entity';

@Entity({ name: 'option' })
export class Option<Q> extends BaseOption {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  url?: string;

  @Column({ type: 'boolean', nullable: true })
  isCorrect?: boolean;

  @Column({
    type: 'integer',
    unsigned: true,
    nullable: true,
    comment: 'Identifier of option for ordering inside order questions',
  })
  order?: number;

  @ManyToMany(() => OneOfQuestionEntity, q => q.options)
  @ManyToMany(() => ManyOfQuestionEntity, q => q.options)
  @ManyToMany(() => OrderQuestionEntity, q => q.options)
  question: Q;

  @ManyToMany(() => OrderQuestionAnswerEntity, a => a.answer, { onDelete: 'CASCADE' })
  @ManyToMany(() => ManyOfQuestionAnswerEntity, a => a.answer, { onDelete: 'CASCADE' })
  answer: Array<OrderQuestionAnswerEntity | ManyOfQuestionAnswerEntity>;
}
