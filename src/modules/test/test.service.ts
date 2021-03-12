import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestService {
  constructor(@InjectRepository(Test) private readonly testRepo: Repository<Test>) {
  }

  createOne(dto: CreateTestDto): Observable<Test> {
    return null;
  }
}
