import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import env from './config/env';

async function bootstrap() {

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if(env.mode === 'dev') app.enableCors();

  await app.listen(env.port);

  logger.log(`Application listening on port ${3000}`);
}
bootstrap();
