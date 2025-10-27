import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true, // Allow cookies to be sent
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that do not have decorators
      forbidNonWhitelisted: true, // throws error if unknown properties are present
      transform: true, // automatically transform payloads to DTO instances
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Orders')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // API docs at /api

  await app.listen(process.env.PORT ?? 3000);
  console.log('http://localHost:3000');
}
bootstrap();
