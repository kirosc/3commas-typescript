export interface DealsParams {
  limit?: number; // Max 1000
  offset?: number;
  account_id?: number;
  bot_id?: number;
  scope?: 'active' | 'finished' | 'completed' | 'cancelled' | 'failed';
  order?:
    | 'created_at'
    | 'updated_at'
    | 'closed_at'
    | 'profit'
    | 'profit_percentage';
  order_direction?: 'asc' | 'desc';
  base?: string;
  quote?: string;
}
