import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';
import { CreateFinishedTestDto } from './dto/create-finished-test.dto';

@ApiTags('finished test')
@Controller('finished-test')
export class FinishedTestController {
  constructor(private readonly finishedTestService: FinishedTestService) {
  }

  @Post()
  createOne(@Body() dto: CreateFinishedTestDto): any {
    return this.finishedTestService.createOne(dto);
  }
}
