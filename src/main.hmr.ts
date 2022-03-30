import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { AppModule } from './modules/app/app.module';
import { setupSwagger } from './swagger';
import { LoggerInterceptor, LoggerService } from './modules/logger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule /*, {
    logger: console,
  }*/,
  );

  const loggerService = app.get<LoggerService>(LoggerService);
  app.useGlobalInterceptors(new LoggerInterceptor(loggerService));

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || 5000;
  const cors = configService.get('CORS') || true;
  const sentryDsn = configService.get('SENTRY_DSN') || true;

  Sentry.init({
    dsn: sentryDsn,
  });

  setupSwagger(app);

  if (cors) {
    app.enableCors();
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
