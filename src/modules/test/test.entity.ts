import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'test' })
export class Test {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: 'object', isArray: true })
  @OneToMany(() => Question, q => q.id)
  questions: Array<Question>;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @ApiModelProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;

  @ApiModelPropertyOptional({ nullable: true })
  @Column({ type: 'smallint', nullable: true })
  order?: number;

  // exercise: object
}
