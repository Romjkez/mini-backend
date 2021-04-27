import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

/**
 * ID param in a path
 */
export class IdDto {
  @ApiModelProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
