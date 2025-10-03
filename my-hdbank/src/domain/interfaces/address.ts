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
  ): Promise<ExtractAddressResponse>;
  getProvince<TParameter>(
    command: Command<TParameter>
  ): Promise<ProvinceResponse>;
  getWard<TParameter>(command: Command<TParameter>): Promise<WardResponse>;
}
