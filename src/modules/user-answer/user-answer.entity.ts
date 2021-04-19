import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneOfQuestionEntity } from '../question/entities/one-of-question.entity';
import { Option } from '../option/entities/option.entity';
import { FinishedTest } from '../finished-test/finished-test.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ManyOfQuestionEntity } from '../question/entities/many-of-question.entity';
import { OrderQuestionEntity } from '../question/entities/order-question.entity';

/**
 * Ответ на вопрос
 */
@Entity({ name: 'userAnswer' })
export class UserAnswer {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OneOfQuestionEntity, isArray: true })
  @OneToMany(() => OneOfQuestionEntity, q => q.id)
  @OneToMany(() => ManyOfQuestionEntity, q => q.id)
  @OneToMany(() => OrderQuestionEntity, q => q.id)
  question: Array<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  answer: Array<Option<OneOfQuestionEntity | ManyOfQuestionEntity | OrderQuestionEntity>>;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToMany(() => FinishedTest, test => test.answers)
  finishedTest: FinishedTest;
}
