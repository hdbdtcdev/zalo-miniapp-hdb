import {
  ExtractAddressRequest,
  ProvinceRequest,
  WardRequest,
} from "@/application/address/address_body";
import config from "@/config/config.json";
import {
  ExtractAddressResponse,
  ProvinceResponse,
  WardResponse,
} from "@/domain/entities/address";
import { IAddressRepository } from "@/domain/interfaces/address";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";

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
  ): Promise<ProvinceResponse> {
    const request = command as unknown as ProvinceRequest;
    const url = "/address-provinces";
    const response = await this.post(url, request);
    return response.data as ProvinceResponse;
  }
  async getWard<TParameter>(
    command: Command<TParameter>
  ): Promise<WardResponse> {
    const request = command as unknown as WardRequest;
    const url = "/address-wards";
    const response = await this.post(url, request);
    return response.data as WardResponse;
  }
  async extractAddress<TParameter>(
    command: Command<TParameter>
  ): Promise<ExtractAddressResponse> {
    const request = command as unknown as ExtractAddressRequest;
    const url = "/extract-address";
    const response = await this.post(url, request);

    return response.data as ExtractAddressResponse;
  }
}
