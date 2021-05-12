import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';
import { IsTestCompletedPipe } from './pipes/is-test-completed.pipe';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { CreateFinishedTestDto } from './dto/create-finished-test.dto';
import { Observable } from 'rxjs';
import { FinishedTest } from './finished-test.entity';
import { IdDto } from '../../common/dto/id.dto';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwtPayloadInterceptor } from '../../common/interceptors/extract-jwt-payload.interceptor';
import { GetManyQueryDto } from '../../common/dto/get-many.dto';
import { JwtPayload } from '../auth/models/jwt-payload.model';
import { FinishedTestSimple } from './models/finished-test-simple.model';

@ApiTags('finished test')
@Controller('finished-test')
export class FinishedTestController {
  constructor(private readonly finishedTestService: FinishedTestService) {
  }

  @UsePipes(IsTestCompletedPipe)
  @Post()
  createOne(@Body() dto: CreateFinishedTestDto): any {
    // Conversion is being processed by Pipe
    return this.finishedTestService.createOne(dto as unknown as CreateFinishedTestInternalDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get list of user\'s finished tests' })
  @UseInterceptors(ExtractJwtPayloadInterceptor)
  @Get('user/:id')
  getFinishedTests(@Param() params: IdDto, @Query() dto: GetManyQueryDto,
                   @Query('jwtPayload') jwtPayload: JwtPayload): Observable<Array<FinishedTestSimple>> {
    return this.finishedTestService.getFinishedTestsOfUser(params.id, dto, jwtPayload);
  }

  @ApiOperation({ summary: 'Get finished test by ID' })
  @Get(':id')
  getById(@Param() dto: IdDto): Observable<FinishedTest> {
    return this.finishedTestService.getById(dto.id);
  }


}
