// RESPONSE

export interface BaseApiResponse<T> {
  data: T;

  // Trường hợp dùng cho HDB API
  resultCode?: string;
  resultMessage?: string;

  // Trường hợp dùng cho V1 API
  status?: Status;
  metaData?: MetaData;
}

export interface Status {
  code: string;
  message: string;
}
export interface MetaData {
  requestId: string;
  signature: string;
  timestamp: number | string;
}

// Reject value in createAsyncThunk
export interface BaseError<T = any> extends Status {
  data?: T;
}
export interface RejectValue<T = any> {
  rejectValue: BaseError<T>;
}
