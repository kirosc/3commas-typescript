import Hex from 'crypto-js/enc-hex';
import HmacSHA256 from 'crypto-js/hmac-sha256';

export function sign(secret: string, url: string, params?: string): string {
  return HmacSHA256(params ? `${url}?${params}` : url, secret).toString(Hex);
}
