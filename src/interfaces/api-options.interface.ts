import { ThreeCommasError } from './three-commas-error.interface';

export interface APIOptions {
  key?: string;
  secrets?: string;
  timeout?: number;
  forcedMode?: 'real' | 'paper';
  errorHandler?: (
    response: ThreeCommasError,
    reject: (reason?: any) => void
  ) => void | Promise<any>;
}
