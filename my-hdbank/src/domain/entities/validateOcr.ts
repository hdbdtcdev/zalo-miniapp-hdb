import { BaseApiResponse } from "../models/base_api_response";

export interface ValidateOcrResponseData {
  publicKey: string;
  isExisted: boolean;
  clientNo: string;
  userId: string;
  linkedAcctRequired: boolean;
  whitelist: boolean;
}
export type ValidateOcrResponse = BaseApiResponse<ValidateOcrResponseData>;
