import Axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import {
  APIOptions,
  SmartTradeHistoryParams,
  SmartTradeParams,
  TransferHistoryParams,
  TransferParams,
} from './types/types';
import { sign } from './lib/crypto';

const ENDPOINT = 'https://api.3commas.io';
const V1 = '/public/api/ver1';
const V2 = '/public/api/v2';

export class API {
  private readonly KEY: string;
  private readonly SECRETS: string;
  private axios: AxiosInstance;

  constructor(options: APIOptions) {
    this.KEY = options.key;
    this.SECRETS = options.secrets;
    this.axios = Axios.create({
      baseURL: ENDPOINT,
      timeout: options.timeout ?? 30000,
      headers: { APIKEY: this.KEY },
    });
    this.axios.interceptors.request.use(
      (config) => {
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

        const relativeUrl = config.url!.replace(config.baseURL!, '');
        const signature = sign(this.SECRETS, relativeUrl, payload);
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
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    version: 1 | 2,
    path: string,
    payload?: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.axios({
          method,
          url: `${ENDPOINT}${version === 1 ? V1 : V2}${path}`,
          params: method === 'GET' ? payload : undefined,
          data: method !== 'GET' ? payload : undefined,
        });
        resolve(data);
      } catch (error) {
        if (error.response) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      }
    });
  }

  async ping() {
    return await this.request('GET', 1, '/ping');
  }

  async time() {
    return await this.request('GET', 1, '/time');
  }

  async transfer(params: TransferParams) {
    return await this.request('POST', 1, '/accounts/transfer', params);
  }

  async getTransferHistory(params: TransferHistoryParams) {
    return await this.request('GET', 1, '/accounts/transfer_history', params);
  }

  async getTransferData() {
    return await this.request('GET', 1, '/accounts/transfer_data');
  }

  async addExchangeAccount(params: any) {
    return await this.request('POST', 1, '/accounts/new', params);
  }

  async editExchangeAccount(params: any) {
    return await this.request('POST', 1, '/accounts/update', params);
  }

  async getExchange() {
    return await this.request('GET', 1, '/accounts');
  }

  async getMarketList() {
    return await this.request('GET', 1, '/accounts/market_list');
  }

  async getMarketPairs(params?: any) {
    return await this.request('GET', 1, '/accounts/market_pairs', params);
  }

  async getCurrencyRate(params: any) {
    return await this.request('GET', 1, '/accounts/currency_rates', params);
  }

  async getActiveTradeEntities(account_id: number | string) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/active_trading_entities`
    );
  }

  async sellAllToUSD(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/sell_all_to_usd`
    );
  }

  async sellAllToBTC(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/sell_all_to_btc`
    );
  }

  async getBalanceChartData(account_id: number | string, params: any) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/balance_chart_data`,
      params
    );
  }

  async loadBalances(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/load_balances`
    );
  }

  async renameExchangeAccount(account_id: number | string, name: string) {
    return await this.request('POST', 1, `/accounts/${account_id}/rename`, {
      name,
    });
  }

  async removeExchangeAccount(account_id: number | string) {
    return await this.request('POST', 1, `/accounts/${account_id}/remove`);
  }

  async getPieChartData(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/pie_chart_data`
    );
  }

  async getAccountTableData(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/account_table_data`
    );
  }

  async getAccountInfo(account_id?: number) {
    return await this.request('GET', 1, `/accounts/${account_id ?? 'summary'}`);
  }

  async getLeverageData(account_id: number | string, pair: string) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/leverage_data`,
      { pair }
    );
  }

  async changeUserMode(mode: 'paper' | 'real') {
    return await this.request('POST', 1, '/users/change_mode', { mode });
  }

  async getSmartTradeHistory(params?: SmartTradeHistoryParams) {
    return await this.request('GET', 2, '/smart_trades', params);
  }

  async smartTrade(params: SmartTradeParams) {
    return await this.request('POST', 2, '/smart_trades', params);
  }

  async getSmartTrade(id: number) {
    return await this.request('GET', 2, `/smart_trades/${id}`);
  }

  async cancelSmartTrade(id: number) {
    return await this.request('DELETE', 2, `/smart_trades/${id}`);
  }

  async updateSmartTrade(id: number, params: any) {
    return await this.request('PATCH', 2, `/smart_trades/${id}`, params);
  }

  async averageSmartTrade(id: number, params: any) {
    return await this.request(
      'POST',
      2,
      `/smart_trades/${id}/add_funds`,
      params
    );
  }

  async closeSmartTrade(id: number) {
    return await this.request('POST', 2, `/smart_trades/${id}/close_by_market`);
  }

  async forceStartSmartTrade(id: number) {
    return await this.request('POST', 2, `/smart_trades/${id}/force_start`);
  }

  async forceProcessSmartTrade(id: number) {
    return await this.request('POST', 2, `/smart_trades/${id}/force_process`);
  }

  async setNoteSmartTrade(id: number, note: string) {
    return await this.request('POST', 2, `/smart_trades/${id}/set_note`, {
      note,
    });
  }
}
