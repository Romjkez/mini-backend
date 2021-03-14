import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OneOfQuestionRepository } from './repositories/one-of-question.repository';
import { ManyOfQuestionRepository } from './repositories/many-of-question.repository';
import { ExactAnswerQuestionRepository } from './repositories/exact-answer-question.repository';
import { CreateQuestionBulkDto } from './dto/create-question-bulk.dto';
import { Questions } from './models/questions.model';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(OneOfQuestionRepository)
              private readonly oneOfQRepo: OneOfQuestionRepository,
              @InjectRepository(ManyOfQuestionRepository)
              private readonly manyOfQRepo: ManyOfQuestionRepository,
              @InjectRepository(ExactAnswerQuestionRepository)
              private readonly exactAnswerQRepo: ExactAnswerQuestionRepository) {
  }

  async createBulk(dto: CreateQuestionBulkDto): Promise<Questions> {
    const result: Questions = {};
    if (dto.oneOfQuestions) {
      result.oneOfQuestions = await this.oneOfQRepo.insertMany(dto.oneOfQuestions);
    }

    if (dto.manyOfQuestions) {
      result.manyOfQuestions = await this.manyOfQRepo.insertMany(dto.manyOfQuestions);
    }

    if (dto.exactAnswerQuestions) {
      result.exactAnswerQuestions = await this.exactAnswerQRepo.insertMany(dto.exactAnswerQuestions);
    }

    return result;
  }

  async getById(id: string) {
    return this.oneOfQRepo.findOneOrFail(id, {});
  }

  update(id: number, dto: any): Observable<any> {
    throw new NotImplementedException();
  }

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }
}
