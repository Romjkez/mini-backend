import { EntityRepository, Repository } from 'typeorm';
import { OrderQuestionEntity } from '../entities/order-question.entity';
import { CreateOrderQuestionDto } from '../dto/create-order-question.dto';
import { Option } from '../../option/entities/option.entity';
import { OrderQuestion } from '../models/order-question.model';

@EntityRepository(OrderQuestionEntity)
export class OrderQuestionRepository extends Repository<OrderQuestionEntity> {
  async insertMany(questions: Array<CreateOrderQuestionDto>): Promise<Array<OrderQuestion>> {

    return this.save(questions)
      .then(async questions => this.findByIds(questions.map(q => q.id)))
      .then(questions => questions.map(q => {
        q.options = q.options.map((option: Option<OrderQuestionEntity>) => {
          delete option.isCorrect;
          return option;
        });
        return q as OrderQuestion;
      }));
  }
}
