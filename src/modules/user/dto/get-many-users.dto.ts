import { UserSortDto } from './user-sort.dto';
import { UserFilterDto } from './user-filter.dto';
import { ValidateNested } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { GetManyDto } from '../../../common/dto/get-many.dto';
import { Type } from 'class-transformer';

export class GetManyUsersDto extends GetManyDto {
  @ValidateNested()
  @Type(() => UserSortDto)
  @ApiModelPropertyOptional({ type: UserSortDto })
  sort?: UserSortDto;

  @ValidateNested()
  @Type(() => UserFilterDto)
  @ApiModelPropertyOptional({ type: UserFilterDto })
  filter?: UserFilterDto;
}
