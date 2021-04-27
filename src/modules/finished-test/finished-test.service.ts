import { FinishedTestRepository } from './finished-test.repository';
import { TestService } from '../test/test.service';
import { Injectable } from '@nestjs/common';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';

@Injectable()
export class FinishedTestService {
  constructor(private readonly finishedTestRepo: FinishedTestRepository,
              private readonly testService: TestService) {
  }

  async createOne(dto: CreateFinishedTestInternalDto) {
    const alias = 'finishedTest';
    const finishedTests = await this.finishedTestRepo.createQueryBuilder(alias)
      .loadRelationCountAndMap(`${alias}.finishedBy`, `${alias}.finishedBy`)
      .getMany();

    if (finishedTests.length === 0) {
      console.log(dto);
      await this.finishedTestRepo.save(dto);
    } else {
      console.log('FINISHED !=0');
    }
  }
}

