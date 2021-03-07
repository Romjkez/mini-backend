import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../../option/option.entity';

/**
 * Type of question in a test
 */
export enum QuestionType {
  /**
   * Put options in a right order
   */
  Order = 'order',
  /**
   * Choose 1 correct answer between many options
   */
  OneOf = 'oneOf',
  /**
   * Type the correct answer (no options, 1 option as correct answer)
   */
  ExactAnswer = 'exactAnswer',
  /**
   * Choose multiple correct answers between many options
   */
  MultipleOf = 'multipleOf'
}

@Entity({ name: 'singleOptionQuestion' })
export class SingleOptionQuestion {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ nullable: false, example: '3123e029-da13-4b68-9bb9-b28d6331814b' })
  @Column({ type: 'uuid', unique: true, comment: 'Unique question identifier among all types of questions' })
  uuid: string;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType), default: QuestionType.OneOf })
  @Column({ type: 'enum', enum: QuestionType, default: QuestionType.OneOf })
  readonly type: QuestionType.OneOf;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  options: Array<Option>;

  @ApiModelProperty({ type: Option })
  @OneToMany(() => Option, option => option.id)
  answer: Option;

  @ApiModelProperty()
  @Column({ type: 'smallint', comment: 'Question order inside the test' })
  order: number;
}