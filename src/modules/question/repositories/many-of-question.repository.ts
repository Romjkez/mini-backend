import { EntityRepository, Repository } from 'typeorm';
import { ManyOfQuestion } from '../entities/many-of-question.entity';
import { CreateManyOfQuestionDto } from '../dto/create-many-of-question.dto';

@EntityRepository(ManyOfQuestion)
export class ManyOfQuestionRepository extends Repository<ManyOfQuestion> {

  async insertMany(questions: Array<CreateManyOfQuestionDto>): Promise<Array<ManyOfQuestion>> {
    return this.save(questions);
  }
}
