import WebSocket from 'ws';

export interface APIOptions {
  key?: string;
  secrets?: string;
  timeout?: number;
  forcedMode?: 'real' | 'paper';
  errorHandler?: (
    response: ThreeCommasError,
    reject: (reason?: any) => void
  ) => void | Promise<any>;
}

export interface ThreeCommasError {
  error: string;
  error_description?: string;
  error_attributes?: {
    [key: string]: string;
  };
}

export interface BotsParams {
  limit?: number; // Max 100
  offset?: number;
  account_id?: number;
  scope?: 'enabled' | 'disabled';
  strategy?: 'long' | 'short';
  sort_by?: 'profit' | 'created_at' | 'updated_at';
  sort_direction?: 'asc' | 'desc';
  quote?: string;
}

export interface BotsStatsParams {
  account_id?: number;
  bot_id?: number;
}

export interface CurrencyParams {
  market_code?: string;
  pair: string;
}

export interface DealsParams {
  /**
   * Max 1000
   */
  limit?: number;
  /**
   * Offset records
   */
  offset?: number;
  /**
   * Param for a filter by created date
   */
  from?: Date;
  /**
   * Account to show bots on.
   *
   * Return all if not specified.
   * Gather this from GET /ver1/accounts
   */
  account_id?: number;
  /**
   * Bot show deals on. Return all if not specified
   */
  bot_id?: number;
  scope?: 'active' | 'finished' | 'completed' | 'cancelled' | 'failed';
  order?:
    | 'created_at'
    | 'updated_at'
    | 'closed_at'
    | 'profit'
    | 'profit_percentage';
  order_direction?: 'asc' | 'desc';
  /**
   * Base currency
   */
  base?: string;
  /**
   * Quote currency
   */
  quote?: string;
}

export interface FundParams {
  order_type: 'market' | 'limit';
  units: {
    value: number | string;
  };
  price?: {
    value: number | string;
  };
}

export interface MarketCurrencyParams {
  market_code: string;
  pair: string;
}

export interface TransferParams {
  currency: string;
  amount: number | string;
  from_account_id: number | string;
  to_account_id: number | string;
}

export interface TransferHistoryParams {
  account_id: number | string;
  currency: string;
  page?: number | string;
  per_page?: number | string;
}

export interface SmartTradeHistoryParams {
  account_id?: number | string;
  pair?: string;
  type?:
    | 'simple_buy'
    | 'simple_sell'
    | 'smart_sell'
    | 'smart_trade'
    | 'smart_cover';
  page?: number | string;
  per_page?: number | string;
  status?: 'all' | 'active' | 'finished' | 'cancelled' | 'failed';
  order_by?: 'created_at' | 'updated_at' | 'closed_at' | 'status';
  order_direction?: 'asc' | 'desc';
}

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
  breakeven?: boolean;
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

// Websocket
export type Channel = 'SmartTradesChannel' | 'DealsChannel';
export type WebsocketCallback = (data: WebSocket.Data) => void;
