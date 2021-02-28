import { CreateUserDto } from './create-user.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserBulkDto {
  @ApiModelProperty({ type: CreateUserDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  data: Array<CreateUserDto>;
}
