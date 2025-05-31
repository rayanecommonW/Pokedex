// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'; // Import Logger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap'); // Create a logger instance for bootstrap

  // Enable CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Default to Vite's port
  app.enableCors({
    origin: frontendUrl, // Allow requests from your Vite frontend port
    methods: 'GET',      // Specify allowed methods (only GET is needed for this app)
    credentials: true,   // If you were to use cookies/sessions
  });
  logger.log(`CORS enabled for origin: ${frontendUrl}`);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Backend application is running on: ${await app.getUrl()}`);
}
bootstrap();
