import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './option.entity';
import { OptionService } from './option.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionService],
  controllers: [],
  exports: [OptionService],
})
export class OptionModule {}
