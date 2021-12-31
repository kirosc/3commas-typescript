import { PositionConditionalPrice } from './position-conditional-price.interface';
import { Trailing } from './trailing.interface';

export interface PositionConditional {
  price: PositionConditionalPrice;
  order_type: 'market' | 'limit';
  trailing?: Trailing;
}
