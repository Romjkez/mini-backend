import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseEntity } from '../exercise/exercise.entity';

@Entity('finishedExercise')
export class FinishedExerciseEntity {
  @ApiModelProperty()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ApiModelProperty({ type: UserEntity })
  @ManyToOne(() => UserEntity, user => user.finishedTests)
  finishedBy: UserEntity;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ readonly: true })
  finishedAt: Date;

  @ApiModelProperty({ type: ExerciseEntity })
  @ManyToOne(() => ExerciseEntity, exercise => exercise.id)
  exercise: ExerciseEntity;

  @ApiModelProperty()
  @Column({ type: 'real', nullable: false })
  result: number;
}
