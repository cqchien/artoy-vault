import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';
import { Type } from 'class-transformer';

export class PageDto<T> {
  @ApiProperty({
    description: 'Array of items',
    isArray: true,
  })
  readonly data!: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PageMetaDto, // assuming PageMetaDto is defined elsewhere
  })
  readonly meta!: PageMetaDto;

  @ApiPropertyOptional({
    description: 'Extra information, such as filters or sorting',
    type: 'object',
    additionalProperties: {
      type: 'string', // or boolean, number based on your actual use case
      example: 'Sample value',
    },
  })
  readonly extra?: Record<string, string | boolean | number>;
}
