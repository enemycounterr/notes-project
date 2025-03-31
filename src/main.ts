import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const { PORT = 5000, API_VERSION = 'v1' } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(API_VERSION);
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription(
      'api блогу — це бекенд, де користувач може ввійти та отримати маркер доступу jwt, який дозволить йому виконувати операцію CRUD. ПРИМІТКА: лише власник публікації може оновлювати та видаляти її',
    )
    .setVersion(`${API_VERSION}`)
    .addTag('api-documentation')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(`${API_VERSION}/doc-api`, app, document);
  let portNumber = PORT;
  await app.listen(portNumber);
  console.log(`PORT: ${portNumber}`);

}
bootstrap();
