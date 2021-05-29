import { forwardRef, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { FinishedTestModule } from '../finished-test/finished-test.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestRepository]), forwardRef(() => FinishedTestModule), TagModule],
  providers: [TestService, Logger],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
