import { DateField, UUIDField } from '../../decorators';

export class AbstractDto {
  @UUIDField()
  id!: Uuid;

  @DateField()
  createdAt!: Date;

  @DateField()
  updatedAt!: Date;
}
