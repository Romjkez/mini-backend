import { CreateOptionDto } from './create-option.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOptionBulkDto {
  @ApiModelProperty({ type: CreateOptionDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  data: Array<CreateOptionDto>;
}
