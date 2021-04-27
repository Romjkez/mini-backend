import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OneOfQuestionEntity } from '../question/entities/one-of-question.entity';
import { ManyOfQuestionEntity } from '../question/entities/many-of-question.entity';
import { ExactAnswerQuestion } from '../question/entities/exact-answer-question.entity';
import { OrderQuestionEntity } from '../question/entities/order-question.entity';
import { ExerciseEntity } from '../exercise/exercise.entity';
import { Tag } from '../tag/tag.entity';

@Entity({ name: 'test' })
export class Test {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToMany(() => OneOfQuestionEntity, q => q.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  oneOfQuestions: Array<OneOfQuestionEntity>;

  @ManyToMany(() => ManyOfQuestionEntity, q => q.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  manyOfQuestions: Array<ManyOfQuestionEntity>;

  @ManyToMany(() => ExactAnswerQuestion, q => q.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  exactAnswerQuestions: Array<ExactAnswerQuestion>;

  @ManyToMany(() => OrderQuestionEntity, q => q.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  orderQuestions: Array<OrderQuestionEntity>;

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

  @ManyToOne(() => ExerciseEntity, e => e.tests)
  exercise: ExerciseEntity;

  @ApiModelProperty()
  @ManyToMany(() => Tag, t => t.tests)
  @JoinTable()
  tags: Array<Tag>;
}
