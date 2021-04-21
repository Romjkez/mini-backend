import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';
import { IsTestCompletedPipe } from './pipes/is-test-completed.pipe';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';

@ApiTags('finished test')
@Controller('finished-test')
export class FinishedTestController {
  constructor(private readonly finishedTestService: FinishedTestService) {
  }

  @UsePipes(IsTestCompletedPipe)
  @Post()
  createOne(@Body() dto: CreateFinishedTestInternalDto): any {
    return this.finishedTestService.createOne(dto);
  }
}
