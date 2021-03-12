import { EntityRepository, Repository } from 'typeorm';
import { ManyOfQuestion } from '../entities/multi-option-question.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateManyOfQuestionDto } from '../dto/create-many-of-question.dto';

@EntityRepository()
export class ManyOfQuestionRepository extends Repository<ManyOfQuestion> {

  async insertMany(questions: Array<CreateManyOfQuestionDto>): Promise<Array<ManyOfQuestion>> {
    const markedQuestions = (questions as Array<Partial<ManyOfQuestion>>).map(q => {
      q.uuid = uuidv4();
      return q;
    });

    return this.save(markedQuestions);
  }
}
