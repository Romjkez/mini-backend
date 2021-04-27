import { EntityRepository, Repository } from 'typeorm';
import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';
import { CreateExactAnswerQuestionDto } from '../dto/create-exact-answer-question.dto';

@EntityRepository(ExactAnswerQuestion)
export class ExactAnswerQuestionRepository extends Repository<ExactAnswerQuestion> {
  async insertMany(questions: Array<CreateExactAnswerQuestionDto>): Promise<Array<ExactAnswerQuestion>> {

    return this.save(questions)
      .then(async questions => this.findByIds(questions.map(q => q.id)));
  }
}
