import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from './single-option-question.entity';

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

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  answer: string;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}
