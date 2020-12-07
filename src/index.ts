import Axios, { AxiosInstance } from 'axios';
import { APIOptions, SmartTradeParams } from './types/types';
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
      timeout: 3000,
      headers: { APIKEY: this.KEY },
    });
    this.axios.interceptors.request.use(
      (config) => {
        config.data = {
          ...config.data,
          api_key: this.KEY,
          secret: this.SECRETS,
        };
        const url = config.url!.replace(config.baseURL!, '');
        const message = JSON.stringify(config.data);
        config.headers.Signature = sign(this.SECRETS, url, message);
        return config;
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
    params?: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.axios({
          method,
          url: `${ENDPOINT}${version === 1 ? V1 : V2}${path}`,
          data: params,
        });
        resolve(data);
      } catch (error) {
        reject(error.response.data);
      }
    });
  }

  async transfer(params: any) {
    return await this.request('POST', 1, '/accounts/transfer', params);
  }

  async getTransferHistory(params: any) {
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

  async getMarketPairs() {
    return await this.request('GET', 1, '/accounts/market_pairs');
  }

  async getCurrencyRate() {
    return await this.request('GET', 1, '/accounts/currency_rates');
  }

  async getActiveTradeEntities(account_id: number) {
    return await this.request('GET', 1, `/accounts/${account_id}/active_trading_entities`);
  }

  async sellAllToUSD(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/sell_all_to_usd`);
  }

  async sellAllToBTC(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/sell_all_to_btc`);
  }

  async getBalanceChartData(account_id: number, params: any) {
    return await this.request('GET', 1, `/accounts/${account_id}/balance_chart_data`, params);
  }

  async loadBalances(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/load_balances`);
  }

  async renameExchangeAccount(account_id: number, name: string) {
    return await this.request('POST', 1, `/accounts/${account_id}/rename`, { name });
  }

  async removeExchangeAccount(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/remove`);
  }

  async getPieChartData(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/pie_chart_data`);
  }

  async getAccountTableData(account_id: number) {
    return await this.request('POST', 1, `/accounts/${account_id}/account_table_data`);
  }

  async getAccountInfo(account_id?: number) {
    return await this.request('GET', 1, `/accounts/${account_id || 'summary'}`);
  }

  async changeUserMode(mode: 'paper' | 'real') {
    return await this.request('POST', 1, '/users/change_mode', { mode });
  }

  async getSmartTradeHistory(params: any) {
    return await this.request('GET', 2, '/smart_trades', params);
  }

  async smartTrade(params: SmartTradeParams) {
    return await this.request('POST', 2, '/smart_trades', params);
  }

  async getSmartTrade(id: number) {
    return await this.request('GET', 2, '/smart_trades', { id });
  }

  async cancelSmartTrade(id: number) {
    return await this.request('DELETE', 2, '/smart_trades', { id });
  }

  async updateSmartTrade(id: number, params: any) {
    return await this.request('PATCH', 2, `/smart_trades/${id}`, params);
  }

  async averageSmartTrade(id: number, params: any) {
    return await this.request('POST', 2, `/smart_trades/${id}/add_funds`, params);
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
