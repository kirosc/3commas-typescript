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
