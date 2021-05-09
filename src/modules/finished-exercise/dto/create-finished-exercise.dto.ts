import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsPositive, Max, Min } from 'class-validator';
import { ExerciseEntity } from '../../exercise/exercise.entity';
import { UserEntity } from '../../user/user.entity';

export class CreateFinishedExerciseDto {
  @ApiModelProperty({ type: 'integer' })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  finishedBy: Pick<UserEntity, 'id'>;

  @ApiModelProperty({ type: 'integer' })
  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  exercise: Pick<ExerciseEntity, 'id'>;

  @ApiModelProperty({ type: 'float' })
  @IsNotEmpty()
  @IsPositive()
  @Max(1)
  @Min(0)
  result: number;
}
