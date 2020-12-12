import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './swagger';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule /*, {
    logger: console,
  }*/,
  );
  setupSwagger(app);
  app.use((req, res, next) => {
    console.log('New request', req.url);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
