import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { SingleOptionQuestion } from './entities/single-option-question.entity';
import { QuestionService } from './question.service';

@Crud({
  model: {
    type: SingleOptionQuestion,
  },
})
@ApiTags('question')
@Controller('question')
export class QuestionController implements CrudController<SingleOptionQuestion> {
  constructor(public service: QuestionService) {
  }
}
