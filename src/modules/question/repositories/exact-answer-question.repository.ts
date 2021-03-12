import { EntityRepository, Repository } from 'typeorm';
import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateExactAnswerQuestionDto } from '../dto/create-exact-answer-question.dto';

@EntityRepository()
export class ExactAnswerQuestionRepository extends Repository<ExactAnswerQuestion> {
  async insertMany(questions: Array<CreateExactAnswerQuestionDto>): Promise<Array<ExactAnswerQuestion>> {
    const markedQuestions = (questions as Array<Partial<ExactAnswerQuestion>>).map(q => {
      q.uuid = uuidv4();
      return q;
    });

    return this.save(markedQuestions);
  }
}
