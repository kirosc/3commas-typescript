export interface APIOptions {
  key: string;
  secrets: string;
  timeout?: number;
}

export interface SmartTradeParams {
  account_id: number;
  pair: string;
  note?: string;
  instant?: boolean;
  skip_enter_step?: boolean;
  leverage?: Leverage;
  position: Position;
  take_profit: TakeProfit;
  stop_loss: StopLoss;
}

export interface Leverage {
  enabled: boolean;
  type?: 'custom' | 'cross';
  value?: number;
}

export interface Position {
  type: 'buy' | 'sell';
  units: UnitsClass;
  price?: UnitsClass;
  order_type: 'market' | 'limit' | 'conditional';
  conditional?: PositionConditional;
}

export interface PositionConditional {
  price: PositionConditionalPrice;
  order_type: 'market' | 'limit';
  trailing?: Trailing;
}

export interface PositionConditionalPrice {
  value: number;
  type: 'bid' | 'ask' | 'last';
}

export interface Trailing {
  enabled: boolean;
  percent?: number;
}

export interface UnitsClass {
  value: number;
}

export interface StopLoss {
  enabled: boolean;
  order_type?: 'market' | 'limit';
  price?: UnitsClass;
  conditional?: StopLossConditional;
  timeout?: Timeout;
}

export interface StopLossConditional {
  price: StepPrice;
  trailing?: Trailing;
}

export interface StepPrice {
  value?: number;
  type: 'bid' | 'ask' | 'last';
  percent?: number;
}

export interface Timeout {
  enabled: boolean;
  value: number;
}

export interface TakeProfit {
  enabled: boolean;
  steps?: Step[];
}

export interface Step {
  order_type: 'market' | 'limit';
  price: StepPrice;
  volume: number;
  trailing?: Trailing;
}
