import { CreateManyOfQuestionAnswerDto } from '../../user-answer/dto/create-many-of-question-answer.dto';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { CreateManyOfQuestionAnswerInternalDto } from '../../user-answer/dto/create-many-of-question-answer-internal.dto';

export function buildManyOfQuestionTestResult(answer: CreateManyOfQuestionAnswerDto, question: ManyOfQuestionEntity)
  : CreateManyOfQuestionAnswerInternalDto {
  return {
    answer: answer.answer.map(answerId => ({ id: answerId })),
    question: { id: question.id },
    // Check if every answerId is among correct options
    isCorrect: answer.answer.every(answerId =>
      question.options.find(option => option.isCorrect && option.id === answerId) !== undefined,
    ),
  };
}
