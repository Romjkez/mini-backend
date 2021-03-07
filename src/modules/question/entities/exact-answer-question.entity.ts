import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from './single-option-question.entity';
import { Option } from '../../option/option.entity';

@Entity({ name: 'exactAnswerQuestion' })
export class ExactAnswerQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ nullable: false, example: '3123e029-da13-4b68-9bb9-b28d6331814b' })
  @Column({ type: 'uuid', unique: true, comment: 'Unique question identifier among all types of questions' })
  uuid: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.ExactAnswer })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.ExactAnswer })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option })
  @OneToOne(() => Option, option => option.id)
  options: Option;

  @ApiModelProperty({ type: Option })
  @OneToMany(() => Option, option => option.id)
  answer: Option;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
