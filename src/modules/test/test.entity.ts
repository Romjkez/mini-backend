import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OneOfQuestion } from '../question/entities/one-of-question.entity';
import { Questions } from '../question/models/questions.model';
import { ManyOfQuestion } from '../question/entities/many-of-question.entity';
import { ExactAnswerQuestion } from '../question/entities/exact-answer-question.entity';

@Entity({ name: 'test' })
export class Test extends Questions {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToMany(() => OneOfQuestion, q => q.id)
  @JoinTable()
  oneOfQuestions: Array<OneOfQuestion>;

  @ManyToMany(() => ManyOfQuestion, q => q.id)
  @JoinTable()
  manyOfQuestions: Array<ManyOfQuestion>;

  @ManyToMany(() => ExactAnswerQuestion, q => q.id)
  @JoinTable()
  exactAnswerQuestions: Array<ExactAnswerQuestion>;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @ApiModelProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;

  @ApiModelPropertyOptional({ nullable: true })
  @Column({ type: 'smallint', nullable: true })
  order?: number;

  // exercise: object
}
