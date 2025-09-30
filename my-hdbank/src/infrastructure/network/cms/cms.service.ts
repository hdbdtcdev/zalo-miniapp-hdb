import { merge } from 'lodash';
import { AxiosService, type RequestConfig } from '../axios';
import configJson from '@/config/config.json';

class CmsService extends AxiosService {
  constructor(config: RequestConfig | undefined = undefined) {
    super(createBaseConfig(config));
  }
}

export { CmsService };

const createBaseConfig = (
  config: RequestConfig | undefined = undefined
): RequestConfig => {
  const baseURL = configJson.BASE_URL ?? "";

  return merge({}, config, {
    baseURL: baseURL,
    headers: merge({}, config?.headers, { Authorization: `` }),
  });
};
