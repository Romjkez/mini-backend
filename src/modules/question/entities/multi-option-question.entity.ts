import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../../option/option.entity';
import { QuestionType } from './single-option-question.entity';

@Entity({ name: 'multiOptionQuestion' })
export class MultiOptionQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.MultipleOf })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.MultipleOf })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  options: Array<Option>;

  @ApiModelProperty({ type: Option })
  @OneToMany(() => Option, option => option.id)
  answer: Array<Option>;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
