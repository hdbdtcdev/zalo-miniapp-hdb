import { BaseApiResponse } from "../models/base_api_response";

export interface Career {
  careerId: string;
  careerName: string;
  businessId: string;
  industryId: string;
}

// Định nghĩa kiểu cho Position
export interface Position {
  careerId: string;
  positionId: string;
  positionName: string;
  occupationCode: string;
}
export interface GetJobResponseData {
  careers: Career[];
  positions: Position[];
}
export type GetJobResponse = BaseApiResponse<GetJobResponseData>;
