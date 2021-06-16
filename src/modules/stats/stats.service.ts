import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { FinishedTestService } from '../finished-test/finished-test.service';
import { StatsPeriod } from './models/stats-period';
import { Observable } from 'rxjs';
import { StatsCountResponseDto } from './dto/stats-count-response.dto';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StatsService {
  constructor(private readonly finishedTestService: FinishedTestService,
              private readonly logger: Logger) {
    logger.setContext('StatsService');
  }

  getFinishedTestsStats(period: StatsPeriod): Observable<StatsCountResponseDto> {
    return this.finishedTestService.getStats(period)
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
