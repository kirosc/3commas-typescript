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
