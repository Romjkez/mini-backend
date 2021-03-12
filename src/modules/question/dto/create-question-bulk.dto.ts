import { CreateOneOfQuestionBulkDto } from './create-one-of-question-bulk.dto';
import { CreateManyOfQuestionBulkDto } from './create-many-of-question-bulk.dto';
import { CreateExactAnswerQuestionBulkDto } from './create-exact-answer-question-bulk.dto';

export class CreateQuestionBulkDto {
  oneOfQuestions?: CreateOneOfQuestionBulkDto;

  manyOfQuestions?: CreateManyOfQuestionBulkDto;

  exactAnswerQuestions?: CreateExactAnswerQuestionBulkDto;
}
