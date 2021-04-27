import { CreateExactAnswerQuestionAnswerDto } from '../../user-answer/dto/create-exact-answer-question-answer.dto';
import { ExactAnswerQuestion } from '../../question/entities/exact-answer-question.entity';
import { CreateExactAnswerQuestionAnswerInternalDto } from '../../user-answer/dto/create-exact-answer-question-answer-internal.dto';

export function buildExactAnswerQuestionTestResult(answer: CreateExactAnswerQuestionAnswerDto,
                                                   question: ExactAnswerQuestion)
  : CreateExactAnswerQuestionAnswerInternalDto {
  return {
    answer: answer.answer,
    question: { id: question.id },
    isCorrect: answer.answer === question.answer,
  };
}
