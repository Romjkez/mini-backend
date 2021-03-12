import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { TestService } from './test.service';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {
  }
}
