import { PageMetaDto } from './../common/dto/page-meta.dto';
import { MetaResponseDto } from './../common/dto/response.dto';
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function ApiPageResponse<T extends Type>(options: {
  type: T;
  description?: string;
}): MethodDecorator {
  return applyDecorators(
    ApiExtraModels(MetaResponseDto),
    ApiExtraModels(PageMetaDto),
    ApiExtraModels(options.type),
    ApiOkResponse({
      description: options.description,
      schema: {
        type: 'object',
        properties: {
          meta: {
            $ref: getSchemaPath(MetaResponseDto),
          },
          response: {
            type: 'object',
            properties: {
              meta: {
                $ref: getSchemaPath(PageMetaDto),
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(options.type) },
              },
            },
          },
        },
      },
    }),
  );
}
