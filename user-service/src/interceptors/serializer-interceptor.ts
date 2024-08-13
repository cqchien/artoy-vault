import { STATUS_CODES } from 'node:http';

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetaResponseDto, ResponseDto } from '../common/dto/response.dto';

@Injectable()
export class SerializerInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response & { statusCode: number }>();

        const statusCode = response.statusCode;

        const meta = new MetaResponseDto(statusCode, STATUS_CODES[statusCode]);

        return new ResponseDto<T>(data, meta);
      }),
    );
  }
}
