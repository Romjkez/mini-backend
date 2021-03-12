import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs';
import { IdDto } from '../../common/dto/id.dto';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  update(@Param() params: IdDto, @Body() dto: any): Observable<any> {
    return this.questionService.update(params.id, dto);
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.questionService.delete(params.id);
  }
}
