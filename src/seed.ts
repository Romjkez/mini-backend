import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Seeder } from './modules/seeder/seeder';
import { SeederModule } from './modules/seeder/seeder.module';
import { catchError, finalize, tap } from 'rxjs/operators';

async function bootstrap(): Promise<void> {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(Seeder);
      seeder.seed()
        .pipe(
          tap(() => logger.log('Seeding complete!')),
          catchError(err => {
            console.error(err);
            this.logger.error(JSON.stringify(err, null, 2));
            throw new Error(err);
          }),
          finalize(async () => await appContext.close()),
        ).subscribe();
    })
    .catch(error => {
      throw error;
    });
}

bootstrap();
