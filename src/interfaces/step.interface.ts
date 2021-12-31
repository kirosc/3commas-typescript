import { StepPrice } from './step-price.interface';
import { Trailing } from './trailing.interface';

export interface Step {
  order_type: 'market' | 'limit';
  price: StepPrice;
  volume: number;
  trailing?: Trailing;
}
