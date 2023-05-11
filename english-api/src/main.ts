import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import * as https from 'https';

import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    httpsOptions: {
      key: fs.readFileSync('C:\\My\\OpenSSL\\CW.key'),
      cert: fs.readFileSync('C:\\My\\OpenSSL\\CW.crt'),
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const configService: ConfigService = app.get(ConfigService);
  const PORT: number = configService.get('APP_PORT');
  const HOST: string = configService.get('APP_HOST');
  const config = new DocumentBuilder()
    .setTitle('Yuzik')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(PORT, () => {
    console.log(`Server launched on host: ${HOST}:${PORT}`);
  });
}

bootstrap();
