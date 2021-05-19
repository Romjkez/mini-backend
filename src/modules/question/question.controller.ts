import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs';
import { IdDto } from '../../common/dto/id.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: UpdateQuestionDto): Observable<any> {
    return this.questionService.update(params.id, dto);
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.questionService.delete(params.id);
  }
}
