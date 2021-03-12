import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { OneOfQuestion } from './entities/one-of-question.entity';
import { QuestionService } from './question.service';

@Crud({
  model: {
    type: OneOfQuestion,
  },
})
@ApiTags('question')
@Controller('question')
export class QuestionController implements CrudController<OneOfQuestion> {
  constructor(public service: QuestionService) {
  }
}
