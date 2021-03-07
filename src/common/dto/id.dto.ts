import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

/**
 * ID param in a path
 */
export class IdDto {
  @ApiModelProperty()
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
