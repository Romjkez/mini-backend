import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { license, version } from 'package.json';
import * as path from 'path';
import { writeFile } from 'fs';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('MINI Backend')
  .setDescription('API of the MINI mobile app')
  .setVersion(version)
  .setLicense(license, 'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions.build());
  if (process.env.NODE_ENV !== 'production') {
    const outputPath = path.resolve(process.cwd(), 'openapi.json');
    writeFile(outputPath, JSON.stringify(document), () => console.log('Successfully saved OpenAPI spec'));
  }

  SwaggerModule.setup('api', app, document);

  app.use(helmet());

  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
