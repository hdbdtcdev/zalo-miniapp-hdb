// ✅ Legacy API response (internal)
interface LegacyResponse {
  responseId: string;
  responseCode: string;
  responseMessage: string;
  responseTime: string;
}

// ✅ V1 API response (internal)
interface Status {
  code: string;
  message: string;
}
interface MetaData {
  requestId: string;
  signature: string;
  timestamp: number | string;
}

// ✅ Common abstract response
export interface BaseApiResponse<T> {
  status: Record<string, any>; // generic structure, có thể là LegacyResponse hoặc Status
  data: T;
  metaData?: Record<string, any>; // optional, chỉ có với V1
}
