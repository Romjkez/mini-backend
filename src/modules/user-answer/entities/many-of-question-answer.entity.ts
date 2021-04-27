import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { Option } from '../../option/entities/option.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

@Entity({ name: 'manyOfQuestionAnswer' })
export class ManyOfQuestionAnswerEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: ManyOfQuestionAnswerEntity })
  @OneToMany(() => ManyOfQuestionEntity, q => q.id)
  question: ManyOfQuestionEntity;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  answer: Array<Option<ManyOfQuestionEntity>>;

  @ApiModelProperty({ type: 'boolean' })
  @Column({ type: 'boolean', nullable: false })
  isCorrect: boolean;

  @ApiModelProperty({ type: FinishedTest })
  @ManyToOne(() => FinishedTest, test => test.manyOfQuestionAnswers)
  finishedTest: FinishedTest;
}
