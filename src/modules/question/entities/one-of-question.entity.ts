import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from '../../option/entities/option.entity';
import { QuestionType } from '../models/question-type';

@Entity({ name: 'oneOfQuestion' })
export class OneOfQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.OneOf })
  readonly type: QuestionType.OneOf;

  @Column({ type: 'varchar' })
  text: string;

  @ManyToMany(() => Option, option => option.question, { eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinTable()
  options: Array<Option<OneOfQuestionEntity>>;

  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
