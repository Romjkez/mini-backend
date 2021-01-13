import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { license, version } from 'package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('MINI Backend')
    .setDescription('API of the MINI mobile app')
    .setVersion(version)
    .setLicense(license, 'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());


  await app.listen(+process.env.PORT || 3000);
}
bootstrap();
