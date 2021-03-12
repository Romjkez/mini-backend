import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleOptionQuestionRepository } from './repositories/single-option-question.repository';
import { MultiOptionQuestionRepository } from './repositories/multi-option-question.repository';
import { ExactAnswerQuestionRepository } from './repositories/exact-answer-question.repository';
import { CreateOneOfQuestionBulkDto } from './dto/create-one-of-question-bulk.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(SingleOptionQuestionRepository)
              private readonlysingleOptionQrepo: SingleOptionQuestionRepository,
              @InjectRepository(MultiOptionQuestionRepository)
              private readonly multiOptionQrepo: MultiOptionQuestionRepository,
              @InjectRepository(ExactAnswerQuestionRepository)
              private readonly exactAnswerQrepo: ExactAnswerQuestionRepository) {
  }

  createBulk(dto: CreateOneOfQuestionBulkDto) {

  }
}
