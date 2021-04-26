import { FinishedTestRepository } from './finished-test.repository';
import { TestService } from '../test/test.service';
import { Injectable } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly testService: TestService) {
  }

  createOne(dto: CreateFinishedTestInternalDto) {
    console.log(dto);
  }
}

