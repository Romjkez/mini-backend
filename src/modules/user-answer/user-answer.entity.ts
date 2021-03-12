import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OneOfQuestion } from '../question/entities/single-option-question.entity';
import { Option } from '../option/option.entity';
import { FinishedTest } from '../finished-test/finished-test.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

/**
 * Ответ на вопрос
 */
@Entity({ name: 'userAnswer' })
export class UserAnswer {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: OneOfQuestion, isArray: true })
  @OneToMany(() => OneOfQuestion, q => q.id)
  question: Array<OneOfQuestion>;

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
