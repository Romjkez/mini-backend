import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { FinishedTestService } from './finished-test.service';
import { FinishedTest } from './finished-test.entity';

@Crud({
  model: {
    type: FinishedTest,
  },
})
@ApiTags('finished test')
@Controller('finished-test')
export class FinishedTestController implements CrudController<FinishedTest> {
  constructor(public service: FinishedTestService) {}
}
