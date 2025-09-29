import { ApiResponse } from "@/infrastructure/network";
import { Command } from "../models";
import {
  ExtractAddressResponse,
  ProvinceResponse,
  WardResponse,
} from "../entities/address";

export interface IAddressRepository {
  extractAddress<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<ExtractAddressResponse>>;
  getProvince<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<ProvinceResponse>>;
  getWard<TParameter>(
    command: Command<TParameter>
  ): Promise<ApiResponse<WardResponse>>;
}
