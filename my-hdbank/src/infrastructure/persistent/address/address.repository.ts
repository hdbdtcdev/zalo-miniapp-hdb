import {
  CardAvailableListDataReq,
  CardAvailableListDataRes,
} from "@/domain/entities/cardAvailableList";
import { ICardAvailableListRepository } from "@/domain/interfaces/card-available-list";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";
import config from "@/config/config.json";
import { IAddressRepository } from "@/domain/interfaces/address";
import {
  ExtractAddressResponse,
  ProvinceResponse,
  WardResponse,
} from "@/domain/entities/address";
import {
  ExtractAddressRequest,
  ProvinceRequest,
  WardRequest,
} from "@/application/address/address_body";

@injectable()
export class AddressRepository
  extends BaseService
  implements IAddressRepository
{
  constructor() {
    super(config.BASE_URL || "");
  }
  async getProvince<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<ProvinceResponse>> {
    const request = command as unknown as ProvinceRequest;
    const url = "/address-provinces";
    const response = await this.post(url, request);
    return response?.data as ApiResponse<ProvinceResponse>;
  }
  async getWard<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<WardResponse>> {
    const request = command as unknown as WardRequest;
    const url = "/address-wards";
    const response = await this.post(url, request);
    return response?.data as ApiResponse<WardResponse>;
  }
  async extractAddress<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<ExtractAddressResponse>> {
    const request = command as unknown as ExtractAddressRequest;
    const url = "/extract-address";
    const response = await this.post(url, request);

    return response?.data as ApiResponse<ExtractAddressResponse>;
  }
}
