import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TestRepository])],
  providers: [TestService, Logger],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
