import { BooleanField, NumberField } from '../../decorators';

export class PageMetaDto {
  @NumberField()
  readonly page!: number;

  @NumberField()
  readonly take!: number;

  @NumberField()
  readonly itemCount!: number;

  @NumberField()
  readonly pageCount!: number;

  @BooleanField()
  readonly hasPreviousPage!: boolean;

  @BooleanField()
  readonly hasNextPage!: boolean;
}
