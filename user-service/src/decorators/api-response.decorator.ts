import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import type {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { MetaResponseDto } from '../common/dto/response.dto';

export function ApiResponse<T extends Type>(options: {
  type: T;
  description?: string;
  isArray?: boolean;
}): MethodDecorator {
  let responseSchema: SchemaObject | ReferenceObject = {
    $ref: getSchemaPath(options.type),
  };

  if (options.isArray) {
    responseSchema = {
      type: 'array',
      items: { $ref: getSchemaPath(options.type) },
    };
  }

  return applyDecorators(
    ApiExtraModels(MetaResponseDto),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        type: 'object',
        properties: {
          meta: {
            $ref: getSchemaPath(MetaResponseDto),
          },
          response: responseSchema,
        },
      },
    } as ApiResponseOptions),
  );
}
