import {
  AxiosHeaders,
  type AxiosRequestConfig,
  type HeadersDefaults,
  type RawAxiosRequestHeaders,
} from 'axios';

export interface MetaResponse {
  requestId: string;
  nextCursor?: number;
}

export interface ErrorResponse {
  field: string;
  message: string;
}

export interface StatusResponse {
  code: string;
  message: string;
  errors?: ErrorResponse[];
}

export interface ApiResponse<T> {
  message?: string;
  meta?: MetaResponse;
  status?: StatusResponse;
  payload?: T;
  data?: T;
}

export type CustomRequestConfig = {
  silentRequest?: boolean;
};

export type RequestConfig = AxiosRequestConfig & { opt?: CustomRequestConfig };

export type RequestHeaders =
  | RawAxiosRequestHeaders
  | AxiosHeaders
  | Partial<HeadersDefaults>;
