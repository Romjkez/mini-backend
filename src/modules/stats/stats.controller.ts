import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { StatsPeriod } from './models/stats-period';
import { StatsService } from './stats.service';
import { Observable } from 'rxjs';
import { StatsPeriodDto } from './dto/stats-period.dto';
import { StatsCountResponseDto } from './dto/stats-count-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';

@ApiBearerAuth()
@ApiTags('stats')
@Controller('stats')
export class StatsController {

  constructor(private readonly statsService: StatsService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get('finished-tests')
  getFinishedTestsStats(@Query() dto: StatsPeriodDto): Observable<StatsCountResponseDto> {
    if (!dto.period) {
      return this.statsService.getFinishedTestsStats(StatsPeriod.DAY);
    }
    return this.statsService.getFinishedTestsStats(dto.period);
  }
}
