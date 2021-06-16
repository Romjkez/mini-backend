import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNumber, Min } from 'class-validator';

export class ExerciseOwnedEntityDto {
  @ApiModelProperty()
  @IsNumber()
  id: number;

  @IsInt()
  @Min(1)
  @ApiModelProperty()
  order: number;
}
