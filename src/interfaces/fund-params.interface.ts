export interface FundParams {
  order_type: 'market' | 'limit';
  units: {
    value: number | string;
  };
  price?: {
    value: number | string;
  };
}
