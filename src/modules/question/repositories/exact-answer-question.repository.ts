import { EntityRepository, Repository } from 'typeorm';
import { ExactAnswerQuestion } from '../entities/exact-answer-question.entity';

@EntityRepository()
export class ExactAnswerQuestionRepository extends Repository<ExactAnswerQuestion> {

}
