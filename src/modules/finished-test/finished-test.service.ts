import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FinishedTest } from './finished-test.entity';

@Injectable()
export class FinishedTestService extends TypeOrmCrudService<FinishedTest> {
  constructor(@InjectRepository(FinishedTest) repo) {
    super(repo);
  }
}
