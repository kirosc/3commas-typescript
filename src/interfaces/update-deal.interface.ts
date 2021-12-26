export interface UpdateDealParams {
  /**
   * The deal_id
   */
  id: number;
  /**
   * New take profit value
   */
  take_profit?: string;
  profit_currency?: 'quote_currency' | 'base_currency';
  /**
   * base – from base order
   * total – from total volume
   */
  take_profit_type?: 'base' | 'total';
  trailing_enabled?: boolean;
  /**
   * New trailing deviation value
   */
  trailing_deviation?: string;
  /**
   * New stop loss percentage value
   */
  stop_loss_percentage?: string;
  /**
   * New max safety orders value
   */
  max_safety_orders?: number;
  /**
   * New active safety orders count value
   */
  active_safety_orders_count?: number;
  stop_loss_timeout_enabled?: boolean;
  /**
   * StopLoss timeout in seconds if StopLoss timeout enabled
   */
  stop_loss_timeout_in_seconds?: number;
  /**
   * Trailing stop loss enabled
   */
  tsl_enabled?: boolean;
  stop_loss_type?: 'stop_loss' | 'stop_loss_and_disable_bot';
  /**
   * Close deal after given number of seconds. Must be greater than 60.
   */
  close_timeout?: number;
}
