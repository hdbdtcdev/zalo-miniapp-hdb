import type { AxiosResponse } from 'axios';

const onSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
  return response;
};

const onError = (error: any) => {
  return Promise.reject(error);
};

export const ResponseInterceptors = { onSuccess, onError };
