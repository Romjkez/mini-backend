import { forwardRef, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { FinishedTestModule } from '../finished-test/finished-test.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestRepository]), forwardRef(() => FinishedTestModule)],
  providers: [TestService, Logger],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
