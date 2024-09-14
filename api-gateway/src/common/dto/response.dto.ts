import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaResponseDto {
  @ApiProperty({
    description: 'HTTP status code of the response',
    example: 200,
  })
  statusCode!: number;

  @ApiPropertyOptional({
    description: 'Message related to the response',
    type: String,
    example: 'Success',
    nullable: true, // indicates that this field can be null
  })
  message?: string | null;

  @ApiPropertyOptional({
    description: 'Error message if any error occurred',
    type: String,
    example: 'Not Found',
    nullable: true, // indicates that this field can be null
  })
  error?: string | null;
}

export class ResponseDto<T> {
  @ApiPropertyOptional({
    description: 'The response payload or data, which could be null',
    nullable: true, // indicates that this field can be null
  })
  response!: T | null;

  @ApiProperty({
    description: 'Metadata related to the response',
    type: MetaResponseDto,
  })
  meta!: MetaResponseDto;
}
