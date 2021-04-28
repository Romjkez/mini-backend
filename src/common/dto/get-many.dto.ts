import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNumberString, IsOptional, IsPositive, Max } from 'class-validator';

const MAX_PER_PAGE = 100;
export const DEFAULT_PER_PAGE = 15;
export const DEFAULT_PAGE = 1;

interface IGetManyDto {
  page?: number;
  perPage?: number;
}

export abstract class GetManyDto implements IGetManyDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @ApiModelPropertyOptional({ description: 'Number of page to show', example: 1, minimum: 1, default: 1 })
  page?: number;

  @IsOptional()
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
  perPage?: number;
}

export class GetManyQueryDto implements IGetManyDto {
  @IsOptional()
  @IsNumberString()
  @ApiModelPropertyOptional({ description: 'Number of page to show', example: 1, minimum: 1, default: 1 })
  page?: number;

  @IsOptional()
  @IsNumberString()
  @ApiModelPropertyOptional({
    description: 'Number of items to return per page',
    example: 15,
    maximum: MAX_PER_PAGE,
    minimum: 1,
    default: DEFAULT_PER_PAGE,
  })
  perPage?: number;
}
