import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { OneOfQuestion } from '../../question/entities/one-of-question.entity';
import { ManyOfQuestion } from '../../question/entities/many-of-question.entity';
import { OrderQuestion } from '../../question/entities/order-question.entity';

@Entity({ name: 'option' })
export class Option<Q> {
  @ApiModelProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
  })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty()
  @Column({ type: 'varchar' })
  text: string;

  @ApiModelPropertyOptional({
    nullable: true,
    example: 'https://i.imgur.com/oygcF4w.jpeg',
  })
  @Column({ type: 'varchar', nullable: true })
  url?: string;

  @ApiModelProperty({ type: 'boolean', nullable: true, example: false })
  @Column({ type: 'boolean', nullable: true })
  isCorrect?: boolean;

  @ApiModelPropertyOptional({ nullable: true, example: 1, description: 'Only for OrderQuestion' })
  @Column({
    type: 'integer',
    unsigned: true,
    nullable: true,
    comment: 'Identifier of option for ordering inside order questions',
  })
  order?: number;

  @ManyToMany(() => OneOfQuestion, q => q.options)
  @ManyToMany(() => ManyOfQuestion, q => q.options)
  @ManyToMany(() => OrderQuestion, q => q.options)
  question: Q;
}
