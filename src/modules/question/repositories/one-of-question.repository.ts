import { EntityRepository, Repository } from 'typeorm';
import { OneOfQuestionEntity } from '../entities/one-of-question.entity';
import { CreateOneOfQuestionDto } from '../dto/create-one-of-question.dto';
import { OneOfQuestion } from '../models/one-of-question.model';

@EntityRepository(OneOfQuestionEntity)
export class OneOfQuestionRepository extends Repository<OneOfQuestionEntity> {
  async insertMany(questions: Array<CreateOneOfQuestionDto>): Promise<Array<OneOfQuestion>> {
    return this.save(questions)
      .then(async questions => this.findByIds(questions.map(q => q.id)))
      .then(questions => questions.map(q => {
        q.options = q.options.map(option => {
          delete option.order;
          return option;
        });
        return q as OneOfQuestion;
      }));
  }
}
