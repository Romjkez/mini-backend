import { EntityRepository, Repository } from 'typeorm';
import { OneOfQuestion } from '../entities/one-of-question.entity';
import { CreateOneOfQuestionDto } from '../dto/create-one-of-question.dto';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository(OneOfQuestion)
export class OneOfQuestionRepository extends Repository<OneOfQuestion> {
  async insertMany(questions: Array<CreateOneOfQuestionDto>): Promise<Array<OneOfQuestion>> {
    const markedQuestions = (questions as Array<Partial<OneOfQuestion>>).map(q => {
      q.uuid = uuidv4();
      return q;
    });

    return this.save(markedQuestions);
    /*return this.save(markedQuestions)
      .then(async questions => this.findByIds(questions.map(q => q.id)));*/
  }
}
