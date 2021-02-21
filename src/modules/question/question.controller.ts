import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Crud({
    model: {
        type: Question,
    },
})
@ApiTags('question')
@Controller('question')
export class QuestionController implements CrudController<Question> {
    constructor(public service: QuestionService) {
    }
}
