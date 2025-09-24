import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { CustomAxiosRequestConfig, RequestConfig } from './types';
import { RequestInterceptors, ResponseInterceptors } from './interceptor';
import { API_TIMEOUT } from '../constants';
import type { AuthToken } from '../../../interfaces';
import { debounce } from 'lodash';
import { UserService } from '@/services/user';
import { LANGUAGE_PREFERENCE_KEY, WebStorage } from '@/services/storage';

const REFRESH_THRESHOLD = 3 * 60 * 1000; // 3 minutes in miliseconds

const createAxios = (config: RequestConfig | undefined) => {
  const instance = axios.create({
    headers: config?.headers,
    timeout: API_TIMEOUT,
    baseURL: config?.baseURL,
  });

  const responseInterceptors =
    ResponseInterceptors.createInterceptors(instance);
  const requestInterceptors = RequestInterceptors.createInterceptors(instance);

  instance.interceptors.request.use(
    requestInterceptors.onFulfilled,
    requestInterceptors.onRejected
  );

  instance.interceptors.response.use(
    responseInterceptors.onSuccess,
    responseInterceptors.onError
  );

  return instance;
};

const refreshAccessToken = async (axiosInstance: AxiosInstance) => {
  try {
    // const currentAuth = UserService.getAuthToken();
    // const domain = Keys.secureFor('BASE_URL');

    // const url = `${domain}/api/authentication-service/v1/auth/refresh-token`;
    // const data = {
    //   accessToken: currentAuth?.accessToken,
    //   refreshToken: currentAuth?.refreshToken,
    // };
    // const response = await axiosInstance.post(url, data, {
    //   isPublic: true,
    // } as CustomAxiosRequestConfig);
    // const payload = response.data.data;
    // const { iat } = jwtDecode(payload.accessToken);
    // const currentAccessToken = jwtDecode(currentAuth?.accessToken || '');
    // // Check if the new token is newer than the current one
    // if (iat && currentAccessToken.iat && iat > currentAccessToken.iat) {
    //   UserService.setAuthToken(payload.accessToken, payload.refreshToken);
    //   return UserService.getAuthToken();
    // }
    // // Else, return the current token
    // return currentAuth;
  } catch (error) {
    throw new AxiosError('UnAuthorized', 'AUT-0024');
  }
};

const checkNetworkOffline = (): Promise<void> => {
  if (!navigator.onLine) {
    // Có thể custom throw error để Axios bắt được
    return Promise.reject(new Error("No internet connection"));
  }
  return Promise.resolve();
}

const checkRefreshToken = async (
  axiosInstance: AxiosInstance,
  config: CustomAxiosRequestConfig
) => {
  try {
    // Check if the request is a public API call
    const authorizationHeader = config.headers?.['GTW-Authorization'];
    if (config.isPublic || !authorizationHeader || authorizationHeader === '') {
      return config;
    }
    const userToken: AuthToken | null = UserService.getAuthToken();

    if (userToken?.expiresIn) {
      const currentTime = Date.now(); // Current time in miliseconds
      const timeUntilExpiry = userToken?.localExpiresIn - currentTime;

      if (timeUntilExpiry <= REFRESH_THRESHOLD) {
        // Token is expiring soon, refreshing...
        const updatedToken = await refreshAccessToken(axiosInstance);
        // config.headers[
        //   'GTW-Authorization'
        // ] = `Bearer ${updatedToken?.accessToken}`;
      }
    }
    return config;
  } catch (error) {
    debouncedEvent('auth.session_expired');
    throw error;
  }
};

const addAsyncHeaders = async (config: CustomAxiosRequestConfig) => {
  const lng = await WebStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  if (lng) {
    config.headers['language'] = lng;
  }
  return config;
};

const debouncedEvent = debounce((eventName: string) => {
  // eventBusService.dispatch({ type: eventName });
}, 250);

export {
  createAxios,
  checkNetworkOffline,
  addAsyncHeaders,
  checkRefreshToken,
  debouncedEvent,
};
