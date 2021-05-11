import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Observable } from 'rxjs';
import { Test } from './test.entity';
import { IdDto } from '../../common/dto/id.dto';
import { GetManyTestsDto } from './dto/get-many-tests.dto';
import { SimpleTest } from './models/simple-test.model';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Post()
  createOne(@Body() dto: CreateTestDto): Observable<Test> {
    return this.testService.createOne(dto);
  }

  @Post('getMany')
  getMany(@Body() dto: GetManyTestsDto): Observable<GetManyResponseDto<SimpleTest>> {
    return this.testService.getMany(dto);
  }

  @Get(':id')
  getById(@Param() dto: IdDto) {
    return this.testService.getById(dto.id);
  }
}
