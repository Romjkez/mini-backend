import { UserSortDto } from './user-sort.dto';
import { UserFilterDto } from './user-filter.dto';
import { ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { GetManyDto } from '../../../common/dto/get-many.dto';

export class GetManyUsersDto extends GetManyDto {
  @ValidateNested()
  @ApiModelPropertyOptional()
  sort?: UserSortDto;

  @ValidateNested()
  @ApiModelPropertyOptional()
  filter?: UserFilterDto;
}
