import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.entity';

@Crud({
    model: {
        type: Test,
    },
})
@ApiTags('test')
@Controller('test')
export class TestController implements CrudController<Test> {
    constructor(public service: TestService) {
    }
}
