import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTestService } from './finished-test.service';
import { FinishedTest } from './finished-test.entity';
import { FinishedTestController } from './finished-test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinishedTest])],
  providers: [FinishedTestService],
  controllers: [FinishedTestController],
  exports: [FinishedTestService],
})
export class FinishedTestModule {
}
