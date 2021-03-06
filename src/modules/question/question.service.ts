import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleOptionQuestion } from './question.entity';

@Injectable()
export class QuestionService extends TypeOrmCrudService<SingleOptionQuestion> {
  constructor(@InjectRepository(SingleOptionQuestion) repo) {
    super(repo);
  }
}
