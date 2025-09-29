import { BaseApiRequest } from "@/domain/models/base_api_request";

export interface ExtractAddressRequestData {
  address: string;
  contactAddr: string;
  channel: string;
}
export interface ProvinceRequestData {
  clientNo: string;
  channel: string;
}
export interface WardRequestData {
  clientNo: string;
  provinceId: string;
  districtId: string;
  channel: string;
}
export type ExtractAddressRequest = BaseApiRequest<ExtractAddressRequestData>;
export type ProvinceRequest = BaseApiRequest<ProvinceRequestData>;
export type WardRequest = BaseApiRequest<WardRequestData>;
