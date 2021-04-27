import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTestService } from './finished-test.service';
import { FinishedTestController } from './finished-test.controller';
import { FinishedTestRepository } from './finished-test.repository';
import { TestModule } from '../test/test.module';

@Module({
  imports: [TypeOrmModule.forFeature([FinishedTestRepository]), TestModule],
  providers: [FinishedTestService],
  controllers: [FinishedTestController],
  exports: [FinishedTestService],
})
export class FinishedTestModule {}
