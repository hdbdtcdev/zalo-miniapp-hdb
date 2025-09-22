import { merge } from 'lodash';
import { AxiosService } from './axiosClient';
import { RequestConfig, RequestHeaders } from './types';
import { v4 as uuidv4 } from "uuid";


class HttpService extends AxiosService {
  constructor(config: RequestConfig | undefined = undefined) {
    config = merge({}, config, {
      headers: createBaseHeaders(config?.headers ?? {}),
    });
    super(config);
  }
}

export { HttpService };

const createBaseHeaders = (headers: RequestHeaders): RequestHeaders => {
  const result = {
    'GTW-Authorization': '',
    'OBD-Authorization': '',
    'X-Request-ID': uuidv4().toString(),
    'X-Open-ID': '',
    'X-Platform': 'iOS',
    'device-id': uuidv4().toString(),
    'device-version': '14.0',
    'device-manufacturer': 'Any',
    'app-version': "1.0",
    'x-app-route-config': '',
    'x-session-id': '',
    'x-amz-request-id': '',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/x-www-form-urlencoded',

    ...headers,
  };
  return result;
};
