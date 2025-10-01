import { v4 as uuidv4 } from 'uuid';
import { merge } from 'lodash';
import {
  AxiosService,
  type RequestConfig,
  type RequestHeaders,
} from '../axios';
import { UserService } from '@/services/user/user.service';
import { Device } from '@/utils';

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
    'X-Client-IP': Device.INFO.ipAddress,
    'X-Platform': '',
    'device-id': Device.ID,
    'device-version': Device.INFO.systemVersion,
    'device-manufacturer': Device.INFO.manufacturer,
    'device-model': Device.INFO.model,
    'device-name': Device.INFO.deviceName,
    'app-version': `${Device.APP_VERSION} (${Device.INFO.buildNumber})`,
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

  result['X-Request-ID'] = uuidv4();

  return result;
};

export { HttpService };