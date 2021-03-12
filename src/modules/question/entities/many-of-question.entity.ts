import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../../option/option.entity';
import { QuestionType } from './one-of-question.entity';

@Entity({ name: 'manyOfQuestion' })
export class ManyOfQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ nullable: false, example: '3123e029-da13-4b68-9bb9-b28d6331814b' })
  @Column({ type: 'uuid', unique: true, comment: 'Unique question identifier among all types of questions' })
  uuid: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.MultipleOf })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MultipleOf })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id, { eager: true })
  options: Array<Option>;

  @ApiModelProperty({ type: Option })
  @OneToMany(() => Option, option => option.id, { eager: true })
  answer: Array<Option>;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
