import { StepPrice } from './step-price.interface';
import { Trailing } from './trailing.interface';

export interface StopLossConditional {
  price: StepPrice;
  trailing?: Trailing;
}
