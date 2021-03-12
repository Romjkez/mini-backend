import { EntityRepository, Repository } from 'typeorm';
import { OneOfQuestion } from '../entities/single-option-question.entity';

@EntityRepository()
export class SingleOptionQuestionRepository extends Repository<OneOfQuestion> {

}
