import { Axios, AxiosError } from 'axios';
import { ApiResponse, RequestConfig } from './types';
import { createAxios } from './utils';

class AxiosService {
  client: Axios;
  private readonly unknownErrorCode = 'UNKNOWN_ERROR';

  constructor(config: RequestConfig | undefined = undefined) {
    this.client = createAxios(config);
  }

  async get<T>(
    url: string,
    config: RequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(url, config);
      return {
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: axiosError.response?.data as any,
        status: {
          code:
            axiosError.status?.toString() ??
            axiosError.code ??
            this.unknownErrorCode,
          message: axiosError.message,
        },
      };
    }
  }

  async post<T, D = any>(
    url: string,
    data: D | undefined = undefined,
    config: RequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, data, config);
      return {
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: axiosError.response?.data as any,
        status: {
          code:
            axiosError.status?.toString() ??
            axiosError.code ??
            this.unknownErrorCode,
          message: axiosError.message,
        },
      };
    }
  }

  async put<T, D = any>(
    url: string,
    data: D | undefined = undefined,
    config: RequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(url, data, config);
      return {
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: axiosError.response?.data as any,
        status: {
          code:
            axiosError.status?.toString() ??
            axiosError.code ??
            this.unknownErrorCode,
          message: axiosError.message,
        },
      };
    }
  }

  async patch<T, D = any>(
    url: string,
    data: D | undefined = undefined,
    config: RequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch(url, data, config);
      return {
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: axiosError.response?.data as any,
        status: {
          code:
            axiosError.status?.toString() ??
            axiosError.code ??
            this.unknownErrorCode,
          message: axiosError.message,
        },
      };
    }
  }

  async delete<T>(
    url: string,
    config: RequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(url, config);
      return {
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: axiosError.response?.data as any,
        status: {
          code:
            axiosError.status?.toString() ??
            axiosError.code ??
            this.unknownErrorCode,
          message: axiosError.message,
        },
      };
    }
  }
}

export { AxiosService };

export type { ApiResponse };
