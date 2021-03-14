import { EntityRepository, Repository } from 'typeorm';
import { OneOfQuestion } from '../entities/one-of-question.entity';
import { CreateOneOfQuestionDto } from '../dto/create-one-of-question.dto';

@EntityRepository(OneOfQuestion)
export class OneOfQuestionRepository extends Repository<OneOfQuestion> {
  async insertMany(questions: Array<CreateOneOfQuestionDto>): Promise<Array<OneOfQuestion>> {
    return this.save(questions);
    /*return this.save(markedQuestions)
      .then(async questions => this.findByIds(questions.map(q => q.id)));*/
  }
}
