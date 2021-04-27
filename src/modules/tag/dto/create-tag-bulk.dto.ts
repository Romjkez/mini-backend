import { CreateTagDto } from './create-tag.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTagBulkDto {
  @ApiModelProperty({ type: CreateTagDto, isArray: true })
  @IsArray()
  @Type(() => CreateTagDto)
  @ValidateNested()
  data: Array<CreateTagDto>;
}
