import axios from 'axios';
import type { RequestConfig } from './types';
import { ResponseInterceptors } from './interceptor';
import { API_TIMEOUT } from './constants';

const createAxios = (config: RequestConfig | undefined) => {
  const instance = axios.create({
    headers: config?.headers,
    timeout: API_TIMEOUT,
    baseURL: config?.baseURL,
  });

  instance.interceptors.response.use(
    ResponseInterceptors.onSuccess,
    ResponseInterceptors.onError
  );

  return instance;
};

export { createAxios };
