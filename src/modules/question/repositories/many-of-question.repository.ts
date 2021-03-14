import { EntityRepository, Repository } from 'typeorm';
import { ManyOfQuestionEntity } from '../entities/many-of-question.entity';
import { CreateManyOfQuestionDto } from '../dto/create-many-of-question.dto';
import { ManyOfQuestion } from '../models/many-of-question.model';

@EntityRepository(ManyOfQuestionEntity)
export class ManyOfQuestionRepository extends Repository<ManyOfQuestionEntity> {

  async insertMany(questions: Array<CreateManyOfQuestionDto>): Promise<Array<ManyOfQuestion>> {
    return this.save(questions)
      .then(async questions => this.findByIds(questions.map(q => q.id)))
      .then(questions => questions.map(q => {
        q.options = q.options.map(option => {
          delete option.order;
          return option;
        });
        return q as ManyOfQuestion;
      }));
  }
}
