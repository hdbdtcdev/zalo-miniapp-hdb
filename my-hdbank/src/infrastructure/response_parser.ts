import { BaseApiResponse } from "@/domain/models/base_api_response";

export class ResponseParser<T> {
  private parseData: (data: T | null) => T;
  private responseAPI: any;

  constructor(
    _responseAPI: any, // nhận cả legacy hoặc v1
    _parseData: (data: T | null) => T,
  ) {
    this.responseAPI = _responseAPI;
    this.parseData = _parseData;
  }

  parse(): BaseApiResponse<T> {
    if (this.isV1(this.responseAPI)) {
      const { data = null, metaData, status } = this.responseAPI;
      return {
        status: { code: status.code, message: status.message },
        data: this.parseData(data),
        metaData: {
          requestId: metaData.requestId,
          signature: metaData.signature,
          timestamp: metaData.timestamp,
        },
      };
    } else {
      const { response, data = null } = this.responseAPI;
      return {
        status: {
          responseId: response.responseId ?? "",
          responseCode: response.responseCode ?? "",
          responseMessage: response.responseMessage ?? "",
          responseTime: response.responseTime ?? "",
        },
        data: this.parseData(data),
      };
    }
  }

  private isV1(data: any): boolean {
    return data && typeof data === "object" && "status" in data && "metaData" in data;
  }
}
