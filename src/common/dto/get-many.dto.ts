import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';
import { Transform } from 'class-transformer';

const MAX_PER_PAGE = 100;
export const DEFAULT_PER_PAGE = 15;
export const DEFAULT_PAGE = 1;

export class GetManyDto {
  @IsOptional()
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @ApiModelPropertyOptional({ description: 'Number of page to show', example: 1, minimum: 1, default: 1 })
  page: number;

  @IsOptional()
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @Max(MAX_PER_PAGE)
  @ApiModelPropertyOptional({
    description: 'Number of items to return per page',
    example: 15,
    maximum: MAX_PER_PAGE,
    minimum: 1,
    default: DEFAULT_PER_PAGE,
  })
  perPage: number;
}
