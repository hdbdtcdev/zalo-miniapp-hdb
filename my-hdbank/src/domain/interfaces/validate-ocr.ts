import {
  ExtractAddressResponse,
  ProvinceResponse,
  WardResponse,
} from "../entities/address";
import { ValidateOcrResponse } from "../entities/validateOcr";
import { Command } from "../models";

export interface IValidateOcrRepository {
  validateOcr<TParameter>(
    command: Command<TParameter>
  ): Promise<ValidateOcrResponse>;
}
