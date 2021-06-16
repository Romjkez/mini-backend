import { StatsPeriod } from '../models/stats-period';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class StatsPeriodDto {
  @ApiModelPropertyOptional({ type: 'string', enum: Object.keys(StatsPeriod) })
  @IsEnum(StatsPeriod)
  @IsOptional()
  @IsNotEmpty()
  readonly period: StatsPeriod;
}
