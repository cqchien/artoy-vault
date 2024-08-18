/* eslint-disable unicorn/prefer-top-level-await */
import { NestFactory, Reflector } from '@nestjs/core';

import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express';

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

export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  await app.init();

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
  );

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
