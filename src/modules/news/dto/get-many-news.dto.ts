import { GetManyDto } from '../../../common/dto/get-many.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { NewsSortDto } from './news-sort.dto';

export class GetManyNewsDto extends GetManyDto {
  @ValidateNested()
  @Type(() => NewsSortDto)
  @ApiModelPropertyOptional()
  @IsOptional()
  sort?: NewsSortDto;
}
