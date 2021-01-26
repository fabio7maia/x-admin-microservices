import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  SWAGGER_API_ROOT,
  SWAGGER_API_NAME,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_AUTH_NAME,
  SWAGGER_API_AUTH_LOCATION,
  SWAGGER_API_SCHEME_HTTP,
  SWAGGER_API_SCHEME_HTTPS,
} from './constants';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addServer(SWAGGER_API_SCHEME_HTTP)
    .addServer(SWAGGER_API_SCHEME_HTTPS)
    .addBearerAuth(
      { name: SWAGGER_API_AUTH_NAME, type: 'http' },
      SWAGGER_API_AUTH_LOCATION,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
};
