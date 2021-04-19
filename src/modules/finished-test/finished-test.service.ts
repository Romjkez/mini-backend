import { Injectable } from '@nestjs/common';
import { FinishedTestRepository } from './finished-test.repository';

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository) {
  }

  createOne() {
  }
}
