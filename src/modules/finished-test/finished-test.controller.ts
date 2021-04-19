import { ApiTags } from '@nestjs/swagger';
import { Controller, Post } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';

@ApiTags('finished test')
@Controller('finished-test')
export class FinishedTestController {
  constructor(private readonly finishedTestService: FinishedTestService) {
  }

  @Post()
  createOne() {
  }
}
