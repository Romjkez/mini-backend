import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { Observable } from 'rxjs';
import { Test } from './test.entity';
import { IdDto } from '../../common/dto/id.dto';
import { GetManyTestsDto } from './dto/get-many-tests.dto';
import { SimpleTest } from './models/simple-test.model';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';
import { ExtractedJwtPayload } from '../../common/models/extracted-jwt-payload.model';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Post()
  createOne(@Body() dto: CreateTestDto): Observable<Test> {
    return this.testService.createOne(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @ApiBody({ type: GetManyTestsDto })
  @Post('getMany')
  getMany(@Body() dto: GetManyTestsDto & ExtractedJwtPayload): Observable<GetManyResponseDto<SimpleTest>> {
    return this.testService.getMany(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @ApiOkResponse({ type: Test })
  @Get(':id')
  getById(@Param() dto: IdDto, @Query() payload: ExtractedJwtPayload): Observable<Test> {
    return this.testService.getById(dto.id, payload.jwtPayload);
  }
}
