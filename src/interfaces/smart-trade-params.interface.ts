import { Leverage, Position } from '../lib/generated-types';

import { StopLoss } from './stop-loss.interface';
import { TakeProfit } from './take-profit.interface';

export interface SmartTradeParams {
  account_id: number;
  pair: string;
  note?: string;
  instant?: boolean;
  skip_enter_step?: boolean;
  leverage?: Leverage;
  position: Position;
  take_profit?: TakeProfit;
  stop_loss?: StopLoss;
}
