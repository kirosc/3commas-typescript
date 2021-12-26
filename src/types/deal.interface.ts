import { DealStatus } from './deal-status.type';

export interface Deal {
  id: number;
  type: 'Deal::ShortDeal' | 'Deal';
  bot_id: number;
  max_safety_orders: number;
  deal_has_error: boolean;
  /**
   * @deprecated
   */
  from_currency_id: number;
  /**
   * @deprecated
   */
  to_currency_id: number;
  account_id: number;
  active_safety_orders_count: number;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
  'finished?': boolean;
  current_active_safety_orders_count: number;
  /**
   * @deprecated
   */
  current_active_safety_orders: number;
  /**
   * completed safeties (not including manual)
   */
  completed_safety_orders_count: number;
  /**
   * completed manual safeties
   */
  completed_manual_safety_orders_count: number;
  'cancellable?': boolean;
  'panic_sellable?': boolean;
  /**
   * Enable trailing take profit. Binance only.
   */
  trailing_enabled: boolean;
  tsl_enabled: boolean;
  stop_loss_timeout_enabled: boolean;
  stop_loss_timeout_in_seconds: number;
  active_manual_safety_orders: number;
  /**
   * Format: QUOTE_BASE
   */
  pair: string;
  status: DealStatus;
  localized_status: string;
  /**
   * Percentage
   */
  take_profit: string;
  base_order_volume: string;
  safety_order_volume: string;
  safety_order_step_percentage: string;
  /**
   * Used for Bitmex bots only
   *
   * custom, cross, not_specified, isolated (not_specified)
   */
  leverage_type: 'custom' | 'cross' | 'not_specified' | 'isolated';
  leverage_custom_value?: string;
  bought_amount: string;
  bought_volume: string;
  bought_average_price: string;
  base_order_average_price: string;
  sold_amount: string;
  sold_volume: string;
  sold_average_price: string;
  take_profit_type: 'base' | 'total';
  final_profit: string;
  /**
   * Percentage
   */
  martingale_coefficient: string;
  /**
   * Percentage
   */
  martingale_volume_coefficient: string;
  /**
   * Percentage
   */
  martingale_step_coefficient: string;
  stop_loss_percentage: string;
  error_message: null;
  profit_currency: 'quote_currency' | 'base_currency';
  stop_loss_type: 'stop_loss' | 'stop_loss_and_disable_bot';
  /**
   * safety order volume currency
   */
  safety_order_volume_type:
    | 'quote_currency'
    | 'base_currency'
    | 'percent'
    | 'xbt';
  /**
   * base order volume currency
   */
  base_order_volume_type:
    | 'quote_currency'
    | 'base_currency'
    | 'percent'
    | 'xbt';
  from_currency: string;
  to_currency: string;
  current_price: string;
  take_profit_price: string;
  stop_loss_price: string;
  final_profit_percentage: string;
  actual_profit_percentage: string;
  bot_name: string;
  account_name: string;
  usd_final_profit: string;
  actual_profit: string;
  actual_usd_profit: string;
  failed_message?: string;
  reserved_base_coin: string;
  reserved_second_coin: string;
  trailing_deviation: string;
  /**
   * Highest price met in case of long deal, lowest price otherwise
   */
  trailing_max_price: number;
  /**
   * Highest price met in TSL in case of long deal, lowest price otherwise
   */
  tsl_max_price: number;
  strategy: 'short' | 'long';
  reserved_quote_funds: number;
  reserved_base_funds: number;
}
