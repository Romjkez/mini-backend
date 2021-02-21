import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService extends TypeOrmCrudService<Test> {
  constructor(@InjectRepository(Test) repo) {
    super(repo);
  }
}
