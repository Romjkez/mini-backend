import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '../refresh-token.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger(TaskService.name);

  constructor(@InjectRepository(RefreshToken) private readonly refreshTokenRepo: Repository<RefreshToken>) {
  }

  @Cron('0 10 * * * *')
  async removeExpiredRefreshTokens() {
    this.logger.log('Removing expired tokens..');

    const res = await this.refreshTokenRepo.createQueryBuilder()
      .delete()
      .from('refreshTokens')
      .where(`expiresAt <= :now`, { now: new Date() })
      .execute();
    this.logger.log(`Successfully removed ${res.affected} expired tokens..`);
  }
}
