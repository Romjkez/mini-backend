import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from '../../option/entities/option.entity';
import { QuestionType } from '../models/question-type';

@Entity({ name: 'manyOfQuestion' })
export class ManyOfQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MultipleOf })
  readonly type: QuestionType.MultipleOf;

  @Column({ type: 'varchar' })
  text: string;

  @ManyToMany(() => Option, option => option.question, { eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinTable()
  options: Array<Option<ManyOfQuestionEntity>>;

  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
