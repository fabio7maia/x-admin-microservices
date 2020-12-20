import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';

const port = process.env.PORT || 5000;
const enableCors =
  process.env.CORS === undefined ? true : process.env.CORS === 'true' || false;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule /*, {
    logger: console,
  }*/,
  );
  setupSwagger(app);

  if (enableCors) {
    app.enableCors();
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
