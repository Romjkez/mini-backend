import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { QuestionType } from '../models/question-type';

@Entity({ name: 'exactAnswerQuestion' })
export class ExactAnswerQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.ExactAnswer })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.ExactAnswer })
  readonly type: QuestionType.ExactAnswer;

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
