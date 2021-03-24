import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseEntity } from '../exercise/exercise.entity';

@Entity('tag')
export class Tag {
  @ApiModelProperty({ example: 1 })
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ example: 'Clubman' })
  @Column({ nullable: false, type: 'varchar', length: 50 })
  text: string;

  @ManyToMany(() => ExerciseEntity, e => e.tags)
  exercises: Array<ExerciseEntity>;
}
