import { GetManyDto } from '../../../common/dto/get-many.dto';
import { ExerciseSortDto } from './exercise-sort.dto';
import { ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseFilterDto } from './exercise-filter.dto';


export class GetManyExercisesDto extends GetManyDto {
  @ValidateNested()
  @ApiModelPropertyOptional()
  sort?: ExerciseSortDto;

  @ValidateNested()
  @ApiModelPropertyOptional()
  filter?: ExerciseFilterDto;
}
