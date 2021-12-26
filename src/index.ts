import Axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';
import WebSocket from 'ws';

import { API_BASE_PATHS, API_BASE_URL, WEBSOCKET_URL } from './constants';
import {
  APIOptions,
  BotsParams,
  BotsStatsParams,
  CurrencyParams,
  DealsParams,
  FundParams,
  MarketCurrencyParams,
  SmartTradeHistoryParams,
  SmartTradeParams,
  ThreeCommasError,
  TransferHistoryParams,
  TransferParams,
  Deal,
} from './interfaces';
import { sign } from './lib/crypto';
import { Convert, Order } from './lib/generated-types';
import { Channel, WebsocketCallback } from './types';

export class API {
  private readonly KEY: string;
  private readonly SECRETS: string;
  private readonly errorHandler?: (
    response: ThreeCommasError,
    reject: (reason?: any) => void,
  ) => void | Promise<any>;
  private axios: AxiosInstance;
  private ws?: WebSocket;

  constructor(options?: APIOptions) {
    this.KEY = options?.key ?? '';
    this.SECRETS = options?.secrets ?? '';
    this.errorHandler = options?.errorHandler;
    this.axios = Axios.create({
      baseURL: API_BASE_URL,
      timeout: options?.timeout ?? 30000,
      headers: {
        APIKEY: this.KEY,
        ...(options?.forcedMode && { 'Forced-Mode': options?.forcedMode }),
      },
    });
    this.axios.interceptors.request.use(
      config => {
        let data = {
          ...config.data,
          api_key: this.KEY,
          secret: this.SECRETS,
        };
        let payload = JSON.stringify(data);

        if (config.method === 'get') {
          payload = qs.stringify(config.params);
          data = null;
        }

        const relativeUrl = config.url?.replace(config.baseURL || '', '') || '';
        const signature = this.SECRETS
          ? sign(this.SECRETS, relativeUrl, payload)
          : '';
        const newConfig = {
          ...config,
          data,
          headers: {
            ...config.headers,
            signature,
          },
        };

        return newConfig;
      },
      error => Promise.reject(error),
    );
  }

  request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    version: 1 | 2,
    path: string,
    payload?: Record<string, any>,
  ): Promise<any> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.axios({
          method,
          url: `${API_BASE_URL}${API_BASE_PATHS[version]}${path}`,
          params: method === 'GET' ? payload : undefined,
          data: method !== 'GET' ? payload : undefined,
        });
        resolve(data);
      } catch (e) {
        const error = e as AxiosError<ThreeCommasError>;
        if (error.response?.data && this.errorHandler) {
          await this.errorHandler(error.response.data, reject);
        }
        reject(error.response?.data ?? error);
      }
    });
  }

  ping(): Promise<any> {
    return this.request('GET', 1, '/ping');
  }

  time(): Promise<any> {
    return this.request('GET', 1, '/time');
  }

  transfer(params: TransferParams): Promise<any> {
    return this.request('POST', 1, '/accounts/transfer', params);
  }

  getTransferHistory(params: TransferHistoryParams): Promise<any> {
    return this.request('GET', 1, '/accounts/transfer_history', params);
  }

  getTransferData(): Promise<any> {
    return this.request('GET', 1, '/accounts/transfer_data');
  }

  addExchangeAccount(params: Record<string, any>): Promise<any> {
    return this.request('POST', 1, '/accounts/new', params);
  }

  editExchangeAccount(params: Record<string, any>): Promise<any> {
    return this.request('POST', 1, '/accounts/update', params);
  }

  getExchange(): Promise<any> {
    return this.request('GET', 1, '/accounts');
  }

  getMarketList(): Promise<any> {
    return this.request('GET', 1, '/accounts/market_list');
  }

  getMarketPairs(params?: Record<string, any>): Promise<any> {
    return this.request('GET', 1, '/accounts/market_pairs', params);
  }

  getCurrencyRate(params: CurrencyParams): Promise<any> {
    return this.request('GET', 1, '/accounts/currency_rates', params);
  }

  getCurrencyRateWithLeverageData(params: MarketCurrencyParams): Promise<any> {
    return this.request(
      'GET',
      1,
      '/accounts/currency_rates_with_leverage_data',
      params,
    );
  }

  getActiveTradeEntities(account_id: number | string): Promise<any> {
    return this.request(
      'GET',
      1,
      `/accounts/${account_id}/active_trading_entities`,
    );
  }

  sellAllToUSD(account_id: number | string): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/sell_all_to_usd`);
  }

  sellAllToBTC(account_id: number | string): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/sell_all_to_btc`);
  }

  getBalanceChartData(
    account_id: number | string,
    params: Record<string, any>,
  ): Promise<any> {
    return this.request(
      'GET',
      1,
      `/accounts/${account_id}/balance_chart_data`,
      params,
    );
  }

  loadBalances(account_id: number | string): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/load_balances`);
  }

  renameExchangeAccount(
    account_id: number | string,
    name: string,
  ): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/rename`, {
      name,
    });
  }

  removeExchangeAccount(account_id: number | string): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/remove`);
  }

  getPieChartData(account_id: number | string): Promise<any> {
    return this.request('POST', 1, `/accounts/${account_id}/pie_chart_data`);
  }

  getAccountTableData(account_id: number | string): Promise<any> {
    return this.request(
      'POST',
      1,
      `/accounts/${account_id}/account_table_data`,
    );
  }

  getAccountInfo(account_id?: number): Promise<any> {
    return this.request('GET', 1, `/accounts/${account_id ?? 'summary'}`);
  }

  getLeverageData(account_id: number | string, pair: string): Promise<any> {
    return this.request('GET', 1, `/accounts/${account_id}/leverage_data`, {
      pair,
    });
  }

  changeUserMode(mode: 'paper' | 'real'): Promise<any> {
    return this.request('POST', 1, '/users/change_mode', { mode });
  }

  getSmartTradeHistory(params?: SmartTradeHistoryParams): Promise<Order[]> {
    return this.request('GET', 2, '/smart_trades', params);
  }

  smartTrade(params: SmartTradeParams): Promise<Order> {
    return this.request('POST', 2, '/smart_trades', params);
  }

  getSmartTrade(id: number): Promise<Order> {
    return this.request('GET', 2, `/smart_trades/${id}`);
  }

  cancelSmartTrade(id: number): Promise<Order> {
    return this.request('DELETE', 2, `/smart_trades/${id}`);
  }

  updateSmartTrade(id: number, params: Record<string, any>): Promise<Order> {
    return this.request('PATCH', 2, `/smart_trades/${id}`, params);
  }

  averageSmartTrade(id: number, params: FundParams): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/add_funds`, params);
  }

  reduceFund(id: number, params: FundParams): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/reduce_funds`, params);
  }

  closeSmartTrade(id: number): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/close_by_market`);
  }

  forceStartSmartTrade(id: number): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/force_start`);
  }

  forceProcessSmartTrade(id: number): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/force_process`);
  }

  setNoteSmartTrade(id: number, note: string): Promise<Order> {
    return this.request('POST', 2, `/smart_trades/${id}/set_note`, {
      note,
    });
  }

  /**
   * Get the sub trades of a smart trade, including entry and take profit orders.
   *
   * @returns SmartTrade Order
   */
  getSubTrade(id: number): Promise<any> {
    return this.request('GET', 2, `/smart_trades/${id}/trades`);
  }

  closeSubTrade(smartTradeId: number, subTradeId: number): Promise<any> {
    return this.request(
      'POST',
      2,
      `/smart_trades/${smartTradeId}/trades/${subTradeId}/close_by_market`,
    );
  }

  cancelSubTrade(smartTradeId: number, subTradeId: number): Promise<any> {
    return this.request(
      'DELETE',
      2,
      `/smart_trades/${smartTradeId}/trades/${subTradeId}`,
    );
  }

  getBots(
    params: BotsParams = {
      limit: 50,
      sort_by: 'created_at',
      sort_direction: 'desc',
    },
  ): Promise<any> {
    return this.request('GET', 1, '/bots', params);
  }

  getBotsStats(params?: BotsStatsParams): Promise<any> {
    return this.request('GET', 1, '/bots/stats', params);
  }

  getBot(id: number): Promise<any> {
    return this.request('GET', 1, `/bots/${id}/show`);
  }

  getDeals(
    params: DealsParams = {
      limit: 50,
      order: 'created_at',
      order_direction: 'desc',
    },
  ): Promise<Deal[]> {
    return this.request('GET', 1, '/deals', params);
  }

  getDeal(id: number): Promise<Deal> {
    return this.request('GET', 1, `/deals/${id}/show`);
  }

  getDealSafetyOrders(id: number): Promise<any> {
    return this.request('GET', 1, `/deals/${id}/market_orders`);
  }

  customRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    version: 1 | 2,
    path: string,
    payload?: Record<string, any>,
  ): Promise<any> {
    return this.request(method, version, path, payload);
  }

  // Websocket

  subscribeSmartTrade(callback?: (data: WebSocket.Data) => void): void {
    this.subscribe('SmartTradesChannel', '/smart_trades', callback);
  }

  subscribeDeal(callback?: (data: WebSocket.Data) => void): void {
    this.subscribe('DealsChannel', '/deals', callback);
  }

  // 3Commas does not support unsubscribe a channel
  unsubscribe(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  /**
   * Validate the response order is consistent with the generated type
   * Or, an error is thrown
   */
  validateOrderType(order: Order): Order {
    return Convert.toOrder(JSON.stringify(order));
  }

  private buildIdentifier(channel: Channel, url: string): string {
    const idetifier = {
      channel,
      users: [
        {
          api_key: this.KEY,
          signature: sign(this.SECRETS, url),
        },
      ],
    };

    return JSON.stringify(idetifier);
  }

  private subscribe(
    channel: Channel,
    url: string,
    callback?: WebsocketCallback,
  ): void {
    const payload = JSON.stringify({
      identifier: this.buildIdentifier(channel, url),
      command: 'subscribe',
    });
    const setUpWebsocket = (socketPayload: string): void => {
      this.ws = new WebSocket(WEBSOCKET_URL);
      this.ws.onopen = (): any => this.ws?.send(socketPayload);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setUpWebsocketListener(callback);
    };
    const setUpWebsocketListener = (
      setupCallback?: WebsocketCallback,
    ): void => {
      if (setupCallback) {
        this.ws?.on('message', (data: Buffer, isBinary: boolean) => {
          const message = isBinary ? data : data.toString();
          setupCallback(message);
        });
      }
      this.ws?.on('close', code => {
        if (code === 1006) {
          setUpWebsocket(payload);
        }
      });
    };

    if (!this.ws) {
      setUpWebsocket(payload);
    } else {
      this.ws.send(payload);
    }
  }
}
