import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetaResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message?: string | null;

  @ApiPropertyOptional()
  error?: string | null;

  constructor(statusCode: number, message?: string, error?: string) {
    this.statusCode = statusCode;
    this.message = message ?? 'Success';
    this.error = error;
  }
}

export class ResponseDto<T> {
  @ApiProperty()
  response: T | null;

  @ApiProperty({
    type: MetaResponseDto,
  })
  meta: MetaResponseDto;

  constructor(data: T | null, meta: MetaResponseDto) {
    this.meta = meta;
    this.response = data;
  }
}
