import { PositionConditional } from './position-conditional.interface';
import { UnitsClass } from './units-class.interface';

export interface Position {
  type: 'buy' | 'sell';
  units: UnitsClass;
  price?: UnitsClass;
  order_type: 'market' | 'limit' | 'conditional';
  conditional?: PositionConditional;
}
