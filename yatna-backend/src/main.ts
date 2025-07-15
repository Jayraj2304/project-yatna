/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // ⬅️ add this line

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(3000);
}
void bootstrap();
