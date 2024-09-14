import './boilerplate.polyfill';

import { NestFactory, Reflector } from '@nestjs/core';

import {
  ExpressAdapter,
  type NestExpressApplication,
} from '@nestjs/platform-express';

import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { setupSwagger } from './setup-swagger';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      bufferLogs: true,
    },
  );
  // Helmet helps secure Express apps by setting HTTP response headers.
  app.use(helmet());
  app.setGlobalPrefix('/api');
  app.use(compression());
  // HTTP request logger middleware for node.js
  app.use(morgan('combined'));
  app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ApiConfigService);

  if (!configService.isProduction) {
    setupSwagger(app);
  }

  app.enableShutdownHooks();

  const port = configService.appConfig.port;
  await app.listen(port);

  console.info(`Server is running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
