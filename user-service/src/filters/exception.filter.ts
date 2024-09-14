import type { ExceptionFilter } from '@nestjs/common';
import { Catch, Logger } from '@nestjs/common';

import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';

@Catch()
export class SystemExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SystemExceptionFilter.name);
  constructor(public reflector: Reflector) {}

  catch(exception: any): any {
    let statusCode = status.INTERNAL;
    let message = exception.message;
    let error = '';

    const errorResponse = exception.getError();

    // Check if errorResponse is an object
    if (typeof errorResponse === 'object' && errorResponse !== null) {
      // Extract message and error from the object if they exist
      message = (errorResponse as any).message || message;
      error = (errorResponse as any).error || '';
    } else {
      // If errorResponse is a string, use it directly
      message = errorResponse as string;
    }

    this.logger.error(
      error || message,
      process.env.NODE_ENV !== 'production' && exception.stack,
    );

    throw new RpcException({
      code: statusCode,
      message,
    });
  }
}
