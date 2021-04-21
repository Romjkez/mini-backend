import { CreateOrderQuestionAnswerDto } from '../../user-answer/dto/create-order-question-answer.dto';
import { OrderQuestionEntity } from '../../question/entities/order-question.entity';
import { CreateOrderQuestionAnswerInternalDto } from '../../user-answer/dto/create-order-question-answer-internal.dto';

export function buildOrderQuestionTestResult(answer: CreateOrderQuestionAnswerDto, question: OrderQuestionEntity)
  : CreateOrderQuestionAnswerInternalDto {
  return {
    question: { id: question.id },
    answer: answer.answer.map(answerId => ({ id: answerId })),
    isCorrect: answer.answer.every((answerId, i) =>
      question.options.findIndex(option => option.id === answerId && option.order === i)),
  };
}
