import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../../option/entities/option.entity';
import { QuestionType } from '../models/question-type';

@Entity({ name: 'oneOfQuestion' })
export class OneOfQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.OneOf })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.OneOf })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.question, { eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  options: Array<Option<OneOfQuestion>>;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
