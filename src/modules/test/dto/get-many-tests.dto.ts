import { GetManyDto } from '../../../common/dto/get-many.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { TestSortDto } from './test-sort.dto';
import { TestFilterDto } from './test-filter.dto';

export class GetManyTestsDto extends GetManyDto {
  @ValidateNested()
  @Type(() => TestSortDto)
  @ApiModelPropertyOptional({ type: TestSortDto })
  sort?: TestSortDto;

  @ValidateNested()
  @Type(() => TestFilterDto)
  @ApiModelPropertyOptional({ type: TestFilterDto })
  filter?: TestFilterDto;
}
