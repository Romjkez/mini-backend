import { CreateTestDto, CreateTestInternalDto } from '../dto/create-test.dto';

export function convertCreateTestDtoToInternal(dto: CreateTestDto): CreateTestInternalDto {
  return {
    title: dto.title,
    exactAnswerQuestions: dto.exactAnswerQuestions,
    order: dto.order,
    manyOfQuestions: dto.manyOfQuestions,
    oneOfQuestions: dto.oneOfQuestions,
    orderQuestions: dto.orderQuestions,
    tags: Array.from(new Set(dto.tags)).map(id => ({ id })),
  };
}
