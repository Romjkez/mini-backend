import { EntityRepository, Repository } from 'typeorm';
import { OneOfQuestion } from '../entities/single-option-question.entity';
import { CreateOneOfQuestionDto } from '../dto/create-one-of-question.dto';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository()
export class OneOfQuestionRepository extends Repository<OneOfQuestion> {
  async insertMany(questions: Array<CreateOneOfQuestionDto>): Promise<Array<OneOfQuestion>> {
    const markedQuestions = (questions as Array<Partial<OneOfQuestion>>).map(q => {
      q.uuid = uuidv4();
      return q;
    });

    return this.save(markedQuestions);
  }
}
