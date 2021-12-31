import { StopLossConditional } from './stop-loss-conditional';
import { Timeout } from './timeout.interface';
import { UnitsClass } from './units-class.interface';

export interface StopLoss {
  enabled: boolean;
  breakeven?: boolean;
  order_type?: 'market' | 'limit';
  price?: UnitsClass;
  conditional?: StopLossConditional;
  timeout?: Timeout;
}
