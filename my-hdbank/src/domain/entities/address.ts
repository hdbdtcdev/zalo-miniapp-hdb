import { BaseApiResponse } from "../models/base_api_response";

export interface AddressData {
  addrProvinceId: string;
  addrProvinceName: string;
  addrDistrictId: string;
  addrDistrictName: string;
  addrWardId: string;
  addrWardName: string;
  addrDetail: string;
  contactProvinceId: string;
  contactProvinceName: string;
  contactDistrictId: string;
  contactDistrictName: string;
  contactWardId: string;
  contactWardName: string;
  contactDetail: string;
}
export interface Province {
  id: string;
  code: string;
  name: string;
  nameUnsigned: string;
}
export interface Ward {
  id: string;
  code: string;
  name: string;
  nameUnsigned: string;
  provinceId: string;
}
export type ExtractAddressResponse = BaseApiResponse<AddressData>;
export type ProvinceResponse = BaseApiResponse<Province[]>;
export type WardResponse = BaseApiResponse<Ward[]>;
