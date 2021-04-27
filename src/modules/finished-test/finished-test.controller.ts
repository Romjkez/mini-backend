import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';
import { IsTestCompletedPipe } from './pipes/is-test-completed.pipe';
import { CreateFinishedTestInternalDto } from './dto/create-finished-test-internal.dto';
import { CreateFinishedTestDto } from './dto/create-finished-test.dto';

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
}
