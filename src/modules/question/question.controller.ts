import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { from, Observable } from 'rxjs';
import { IdDto } from '../../common/dto/id.dto';
import { CreateQuestionBulkDto } from './dto/create-question-bulk.dto';
import { Questions } from './models/questions.model';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {
  }

  // todo remove
  @Post('bulk')
  createBulk(@Body() dto: CreateQuestionBulkDto): Observable<Questions> {
    return from(this.questionService.createBulk(dto));
  }

  // todo remove
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.questionService.getById(id);
  }

  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: any): Observable<any> {
    return this.questionService.update(params.id, dto);
  }

  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.questionService.delete(params.id);
  }
}
