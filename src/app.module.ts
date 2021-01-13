import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    // TODO: uncomment when db config is ready
    // DatabaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
