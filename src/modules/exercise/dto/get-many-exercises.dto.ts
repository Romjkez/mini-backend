import { GetManyDto } from '../../../common/dto/get-many.dto';
import { ExerciseSortDto } from './exercise-sort.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ExerciseFilterDto } from './exercise-filter.dto';
import { Type } from 'class-transformer';


export class GetManyExercisesDto extends GetManyDto {
  @ValidateNested()
  @Type(() => ExerciseSortDto)
  @ApiModelPropertyOptional()
  @IsOptional()
  sort?: ExerciseSortDto;

  @ValidateNested()
  @Type(() => ExerciseFilterDto)
  @ApiModelPropertyOptional()
  @IsOptional()
  filter?: ExerciseFilterDto;
}
