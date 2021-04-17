import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ExerciseEntity } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { IdDto } from '../../common/dto/id.dto';
import { GetManyExercisesDto } from './dto/get-many-exercises.dto';
import { SimpleExercise } from './model/simple-exercise.model';

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

  // Made POST method for swagger ui (no need to describe each query param in decorator)
  @ApiOkResponse({ type: SimpleExercise, isArray: true })
  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyExercisesDto): Observable<Array<SimpleExercise>> {
    return this.exerciseService.getMany(dto);
  }
}
