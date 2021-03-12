import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinishedTest } from './finished-test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinishedTestService {
  constructor(@InjectRepository(FinishedTest) private readonly finishedTestRepo: Repository<FinishedTest>) {
  }
}
