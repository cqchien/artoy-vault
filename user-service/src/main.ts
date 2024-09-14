/* eslint-disable unicorn/prefer-top-level-await */
import './boilerplate.polyfill';

import { join } from 'node:path';

import type { INestMicroservice } from '@nestjs/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { USER_SERVICE_PACKAGE_NAME } from 'modules/user/user.pb';
import { ValidationError } from 'class-validator';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { SystemExceptionFilter } from 'filters/exception.filter';

export async function bootstrap(): Promise<INestMicroservice> {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: USER_SERVICE_PACKAGE_NAME,
      protoPath: join(
        'node_modules/@cqchien/artoy-vault-service-protos/dist/src/proto/user-service/user.proto',
      ),
      url: `0.0.0.0:${process.env.PORT}`,
    },
  });

  const reflector = app.get(Reflector);

  app.useGlobalFilters(new SystemExceptionFilter(reflector));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors
          .map((error) => JSON.stringify(error))
          .join('; ');

        return new RpcException({
          code: GrpcStatus.INVALID_ARGUMENT,
          message: `Validation failed: ${errorMessages}`,
        });
      },
    }),
  );

  app.enableShutdownHooks();

  await app.listen();

  console.info(`User Service is running on port ${process.env.PORT}`);

  return app;
}

void bootstrap();
