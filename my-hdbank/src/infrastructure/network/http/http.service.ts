import uuid from 'react-native-uuid';
import { merge } from 'lodash';
import {
  AxiosService,
  type RequestConfig,
  type RequestHeaders,
} from '../axios';
import { UserService } from '@/services/user/user.service';

class HttpService extends AxiosService {
  constructor(config: RequestConfig | undefined = undefined) {
    config = merge({}, config, {
      headers: createBaseHeaders(config?.headers ?? {}),
    });
    super(config);
  }
}

const createBaseHeaders = (headers: RequestHeaders): RequestHeaders => {
  const userAuth = UserService.getAuthToken();

  const result = {
    'GTW-Authorization': '',
    'OBD-Authorization': '',
    'X-Request-ID': '',
    'X-Open-ID': '',
    'X-Platform': '',
    'x-app-route-config': '',
    'x-session-id': '',
    'x-amz-request-id': '',
    'Cache-Control': 'no-store',
    ...headers,
  };

  if (userAuth?.accessToken) {
    result['GTW-Authorization'] = `Bearer ${userAuth.accessToken}`;
  }

  if (userAuth?.sessionId) {
    result['x-session-id'] = userAuth.sessionId;
  }

  result['X-Request-ID'] = uuid.v4().toString();

  return result;
};

export { HttpService };