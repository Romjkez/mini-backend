import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseEntity } from '../exercise/exercise.entity';

@Entity('tag')
export class Tag {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty()
  @Column({ nullable: false, type: 'varchar', length: 50 })
  text: string;

  @ManyToMany(() => ExerciseEntity, e => e.tags)
  exercises: Array<ExerciseEntity>;
}
