import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test } from './test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  providers: [TestService, Logger],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
