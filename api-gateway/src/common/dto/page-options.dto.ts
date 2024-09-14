import { Order } from './../../constants/order';
import { EnumFieldOptional, NumberFieldOptional } from '../../decorators';

export class PageOptionsDto {
  @EnumFieldOptional(() => Order)
  readonly order: Order = Order.ASC;

  @NumberFieldOptional({
    min: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberFieldOptional({
    min: 1,
    max: 50,
    int: true,
  })
  readonly take: number = 10;
}
