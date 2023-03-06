import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    cors: true,
  });
  await app.listen(5001);
}
bootstrap();
