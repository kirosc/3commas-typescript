export interface ThreeCommasError {
  error: string;
  error_description?: string;
  error_attributes?: {
    [key: string]: string;
  };
}
