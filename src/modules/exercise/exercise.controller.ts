import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ExerciseEntity } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { IdDto } from '../../common/dto/id.dto';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {
  }

  @Post()
  createOne(@Body() dto: CreateExerciseDto): Observable<ExerciseEntity> {
    return this.exerciseService.createOne(dto);
  }

  @Get(':id')
  getById(@Param() dto: IdDto): Observable<ExerciseEntity> {
    return this.exerciseService.getById(dto.id);
  }
}
