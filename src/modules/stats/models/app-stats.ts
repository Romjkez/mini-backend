import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AppPeriodStats {
  @ApiModelProperty({ example: 5 })
  finishedTests: number;
}

export class AppStats {
  @ApiModelProperty({ example: 4 })
  activeUsers: number;
  @ApiModelProperty({ type: AppPeriodStats, nullable: false })
  periodStats: AppPeriodStats;
}

