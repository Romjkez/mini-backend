import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService extends TypeOrmCrudService<Question> {
  constructor(@InjectRepository(Question) repo) {
    super(repo);
  }
}
