
import uuid from 'react-native-uuid';
import { HttpService } from '../network';
import { getRequestTimeWithTimeZone } from '@/utils';

function getHeaders(config?: Record<string, string | undefined>): {
  [k: string]: string | undefined;
} {
  const headers: Record<string, string | undefined> = {
    'X-Transaction-ID': uuid.v4().toString(),
    'X-Request-ID': uuid.v4().toString(),
    'X-Function-Code': '',
    'X-Channel': 'DI',
    'Content-Type': 'application/json',
    'X-Request-Time': getRequestTimeWithTimeZone(),
    ...config,
  };
  if (config && config.transactionId) {
    headers['X-Transaction-ID'] = config.transactionId;
  }
  if (config && config.functionCode) {
    headers['X-Function-Code'] = config.functionCode;
  }
  if (config && config.rootTransactionId) {
    headers['X-Root-Transaction-ID'] = config.rootTransactionId;
  }
  return Object.fromEntries(
    Object.entries(headers).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
}

export class BaseService extends HttpService {
  constructor(baseURL: string) {
    console.log(`KhanhNHB baseURL: ===> ${JSON.stringify(baseURL)}`)
    super({ baseURL });
  }

  protected generateHeaders(
    customHeaders?: Record<string, string | undefined>,
  ) {
    return getHeaders(customHeaders);
  }
}
