import { type AxiosInstance, type AxiosResponse } from 'axios';
import { HTTP_CODE } from '../constants';
import type { CustomAxiosRequestConfig } from './types';
import {
  checkNetworkOffline,
  checkRefreshToken,
  addAsyncHeaders,
  debouncedEvent,
} from './utils';

// MARK: - Request Interceptor
export class RequestInterceptors {
  static createInterceptors(axiosInstance: AxiosInstance) {
    return {
      onFulfilled: async (config: CustomAxiosRequestConfig) => {
        await checkNetworkOffline();
        config = await addAsyncHeaders(config);
        config = await checkRefreshToken(axiosInstance, config);
        return config;
      },
      onRejected: (error: any) => {
        return Promise.reject(error);
      },
    };
  }
}

// MARK: - Response Interceptor
export class ResponseInterceptors {
  static createInterceptors(_: AxiosInstance) {
    return {
      onSuccess: (response: AxiosResponse) => response,
      onError: async (error: any) => {
        if (error.response) {
          const { status, data } = error.response;
          if (
            status === HTTP_CODE.UNAUTHORIZED &&
            data?.status?.code === 'AUT-0003'
          ) {
            debouncedEvent('auth.user_login_other_device');
          }
        }

        return Promise.reject(error);
      },
    };
  }
}
