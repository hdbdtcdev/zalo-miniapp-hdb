
import { v4 as uuidv4 } from 'uuid';
import { HttpService } from '../network';
import { getRequestTimeWithTimeZone } from '@/utils';

function getHeaders(config?: Record<string, string | undefined>): {
  [k: string]: string | undefined;
} {
  const headers: Record<string, string | undefined> = {
    'X-Transaction-ID': uuidv4(),
    'X-Request-ID': uuidv4(),
    'X-Function-Code': '',
    'X-Channel': 'mfe-dop-zalo',
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
    super({ baseURL });
  }

  protected generateHeaders(
    customHeaders?: Record<string, string | undefined>,
  ) {
    return getHeaders(customHeaders);
  }
}
