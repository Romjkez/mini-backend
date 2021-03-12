import { EntityRepository, Repository } from 'typeorm';
import { ManyOfQuestion } from '../entities/multi-option-question.entity';

@EntityRepository()
export class MultiOptionQuestionRepository extends Repository<ManyOfQuestion> {

}
