export interface StepPrice {
  value?: number;
  type: 'bid' | 'ask' | 'last';
  percent?: number;
}
