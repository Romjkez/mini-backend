import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { license, version } from 'package.json';
import * as path from 'path';
import { writeFile } from 'fs';
import { Logger, ValidationPipe } from '@nestjs/common';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('MINI Backend')
  .setDescription('API of the MINI mobile app')
  .setVersion(version)
  .setContact('Roman Meshkov', '', 'meshkov.ra@ya.ru')
  .addBearerAuth({ bearerFormat: 'JWT', type: 'http', scheme: 'bearer' }, 'bearer')
  .setLicense(
    license,
    'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode',
  );

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  if (process.env.NODE_ENV !== 'production') {
    const outputPath = path.resolve(process.cwd(), 'openapi.json');
    writeFile(outputPath, JSON.stringify(document), () => {
      const logger = new Logger();
      logger.setContext('Main');
      logger.log('Successfully saved OpenAPI spec');
    });
  }

  SwaggerModule.setup('api', app, document);

  app.use(helmet());

  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
