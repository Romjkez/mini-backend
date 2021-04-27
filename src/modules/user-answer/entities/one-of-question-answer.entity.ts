import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';
import { Option } from '../../option/entities/option.entity';

/**
 * Ответ на вопрос
 */
@Entity({ name: 'oneOfQuestionAnswer' })
export class OneOfQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OneOfQuestionEntity })
  @OneToMany(() => OneOfQuestionEntity, q => q.id)
  question: OneOfQuestionEntity;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  answer: Option<OneOfQuestionEntity>;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.oneOfQuestionAnswers)
  finishedTest: FinishedTest;
}
