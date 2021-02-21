import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Option } from '../option/option.entity';

export enum QuestionType {
  Order = 'order',
  OneOf = 'oneOf',
  ExactAnswer = 'exactAnswer',
}

@Entity()
export class Question {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: 'string', enum: Object.values(QuestionType) })
  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  options: Array<Option>;

  @ApiModelProperty({ type: Option, isArray: true })
  @OneToMany(() => Option, option => option.id)
  correctAnswer: Array<Option>;
}
