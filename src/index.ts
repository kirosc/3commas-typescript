import Axios, { AxiosInstance } from 'axios';
import { APIOptions } from './types/types';
import qs from 'qs';
import { sign } from './lib/crypto';

const ENDPOINT = 'https://api.3commas.io';
const V2 = '/public/api/v2';

export default class API {
  private readonly KEY: string;
  private readonly SECRETS: string;
  private axios: AxiosInstance;

  constructor(options: APIOptions) {
    this.KEY = options.key;
    this.SECRETS = options.secrets;
    this.axios = Axios.create({
      baseURL: ENDPOINT,
      timeout: 3000,
      headers: { 'APIKEY': this.KEY },
      paramsSerializer: qs.stringify,
    });
    this.axios.interceptors.request.use(config => {
      config.params = {
        ...config.params,
        api_key: this.KEY,
        secret: this.SECRETS
      };
      const url = config.url!.replace(config.baseURL!, '');
      const message = qs.stringify(config.params);
      config.headers.Signature = sign(this.SECRETS, url, message);
      return config;
    }, error => {
      return Promise.reject(error);
    });
  }

  private request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, params: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.axios({
          method,
          url: `${ENDPOINT}${V2}${path}`,
          params
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getSmartTradeHistory(params: any) {
    return await this.request('GET', '/smart_trades', params);
  }
}
