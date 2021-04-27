import { CreateManyOfQuestionAnswerDto } from '../../user-answer/dto/create-many-of-question-answer.dto';
import { ManyOfQuestionEntity } from '../../question/entities/many-of-question.entity';
import { CreateManyOfQuestionAnswerInternalDto } from '../../user-answer/dto/create-many-of-question-answer-internal.dto';

export function buildManyOfQuestionTestResult(answer: CreateManyOfQuestionAnswerDto, question: ManyOfQuestionEntity)
  : CreateManyOfQuestionAnswerInternalDto {
  const correctAnswers = question.options.filter(option => option.isCorrect);

  return {
    answer: answer.answer.map(answerId => ({ id: answerId })),
    question: { id: question.id },
    // Check if correct answer is presented
    isCorrect: answer.answer.length === correctAnswers.length &&
      correctAnswers.every(option => answer.answer.includes(option.id)),
  };
}
