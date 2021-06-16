import { Logger, Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { FinishedTestModule } from '../finished-test/finished-test.module';

@Module({
  imports: [FinishedTestModule],
  controllers: [StatsController],
  providers: [StatsService, Logger],
})
export class StatsModule {}
