import { UserSortDto } from './user-sort.dto';
import { UserFilterDto } from './user-filter.dto';
import { ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class GetManyUsersDto {
  @ValidateNested()
  @ApiModelPropertyOptional()
  sort?: UserSortDto;

  @ValidateNested()
  @ApiModelPropertyOptional()
  filter?: UserFilterDto;
}
