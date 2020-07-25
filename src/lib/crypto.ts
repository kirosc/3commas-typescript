
import HmacSHA256 from 'crypto-js/hmac-sha256'
import Hex from 'crypto-js/enc-hex';

export function sign(secret: string, url: string, params: string): string {
  return HmacSHA256(`${url}?${params}`, secret).toString(Hex);
}