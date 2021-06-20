import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { FinishedTestService } from '../finished-test/finished-test.service';
import { StatsPeriod } from './models/stats-period';
import { Observable } from 'rxjs';
import { StatsCountResponseDto } from './dto/stats-count-response.dto';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class StatsService {
  constructor(private readonly finishedTestService: FinishedTestService,
              private readonly authService: AuthService,
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

  getActiveUsers(): Observable<StatsCountResponseDto> {
    return this.authService.getLoginStats()
      .pipe(
        catchError(err => {
          console.error(err);
          this.logger.error(JSON.stringify(err, null, 2));
          throw new InternalServerErrorException(err);
        }),
      );
  }
}
