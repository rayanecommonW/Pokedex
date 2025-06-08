// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.use(helmet());
  app.enableCors({
    origin: frontendUrl, 
    methods: 'GET',
    credentials: true,
  });
  logger.log(`CORS enabled for origin: ${frontendUrl}`);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Backend application is running on: ${await app.getUrl()}`);
}
bootstrap();
