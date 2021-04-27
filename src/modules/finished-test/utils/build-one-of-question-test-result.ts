import { CreateOneOfQuestionAnswerInternalDto } from '../../user-answer/dto/create-one-of-question-answer-internal.dto';
import { OneOfQuestionEntity } from '../../question/entities/one-of-question.entity';
import { CreateOneOfQuestionAnswerDto } from '../../user-answer/dto/create-one-of-question-answer.dto';

export function buildOneOfQuestionTestResult(answer: CreateOneOfQuestionAnswerDto, question: OneOfQuestionEntity)
  : CreateOneOfQuestionAnswerInternalDto {
  return {
    answer: { id: answer.answer },
    question: { id: answer.question },
    isCorrect: question.options.some(option => option.isCorrect && option.id === answer.answer),
  };
}
