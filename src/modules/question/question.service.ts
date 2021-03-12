import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OneOfQuestionRepository } from './repositories/one-of-question.repository';
import { ManyOfQuestionRepository } from './repositories/many-of-question.repository';
import { ExactAnswerQuestionRepository } from './repositories/exact-answer-question.repository';
import { CreateQuestionBulkDto } from './dto/create-question-bulk.dto';
import { Questions } from './models/questions.model';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Option } from '../option/option.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(OneOfQuestionRepository)
              private readonly oneOfQRepo: OneOfQuestionRepository,
              @InjectRepository(ManyOfQuestionRepository)
              private readonly manyOfQRepo: ManyOfQuestionRepository,
              @InjectRepository(ExactAnswerQuestionRepository)
              private readonly exactAnswerQRepo: ExactAnswerQuestionRepository,
              @InjectRepository(Option)
              private readonly optionRepo: Repository<Option>) {
  }

  async createBulk(dto: CreateQuestionBulkDto): Promise<Questions> {
    const result: Questions = {};
    if (dto.oneOfQuestions) {
      const questionsWithOptions = await Promise.all(dto.oneOfQuestions.data.map(async q => {
        q.answer = await this.optionRepo.save(q.answer);
        q.options = await this.optionRepo.save(q.options);
        return q;
      }));
      result.oneOfQuestions = await this.oneOfQRepo.insertMany(questionsWithOptions);
    }

    if (dto.manyOfQuestions) {
      const questionsWithOptions = await Promise.all(dto.manyOfQuestions.data.map(async q => {
        q.answer = await this.optionRepo.save(q.answer);
        q.options = await this.optionRepo.save(q.options);
        return q;
      }));

      result.manyOfQuestions = await this.manyOfQRepo.insertMany(questionsWithOptions);
    }

    if (dto.exactAnswerQuestions) {
      result.exactAnswerQuestions = await this.exactAnswerQRepo.insertMany(dto.exactAnswerQuestions.data);
    }

    return result;
  }

  update(id: number, dto: any): Observable<any> {
    throw new NotImplementedException();
  }

  delete(id: number): Observable<void> {
    throw new NotImplementedException();
  }
}
