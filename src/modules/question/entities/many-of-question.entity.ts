import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../../option/entities/option.entity';
import { QuestionType } from '../models/question-type';

@Entity({ name: 'manyOfQuestion' })
export class ManyOfQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.MultipleOf })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MultipleOf })
  readonly type: QuestionType.MultipleOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.question, { eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  options: Array<Option<ManyOfQuestion>>;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
