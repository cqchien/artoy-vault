/* eslint-disable unicorn/prefer-top-level-await */
import './boilerplate.polyfill';

import { join } from 'node:path';

import type { INestMicroservice } from '@nestjs/common';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { SystemExceptionFilter } from './filters/exception.filter';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { SerializerInterceptor } from './interceptors/serializer-interceptor';
import { protobufPackage } from './modules/user/user.pb';

export async function bootstrap(): Promise<INestMicroservice> {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: protobufPackage,
      protoPath: join(
        'node_modules/@cqchien/artoy-vault-service-protos/dist/src/proto/user-service/user.proto',
      ),
      url: `0.0.0.0:${process.env.PORT}`,
    },
  });

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new SystemExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new SerializerInterceptor(),
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

  app.enableShutdownHooks();

  await app.listen();

  console.info(`User Service is running on port ${process.env.PORT}`);

  return app;
}

void bootstrap();
