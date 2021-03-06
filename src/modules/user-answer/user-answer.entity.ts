import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Question } from '../question/question.entity';
import { Option } from '../option/option.entity';
import { FinishedTest } from '../finished-test/finished-test.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

/**
 * Ответ на вопрос
 */
@Entity({ name: 'userAnswer' })
export class UserAnswer {
  @ApiModelProperty({ type: Question, isArray: true })
  @OneToMany(() => Question, q => q.id)
  question: Array<Question>;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  answer: Array<Option>;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToMany(() => FinishedTest, test => test.answers)
  finishedTest: FinishedTest;
}
