import { TYPES } from "@/di/types/types";
import { IAddressRepository } from "@/domain/interfaces/address";
import { Command } from "@/domain/models";
import { inject } from "inversify";
import {
  ExtractAddressRequest,
  ProvinceRequest,
  WardRequest,
} from "./address_body";

export class AddressHandler {
  private readonly _repository: IAddressRepository;

  constructor(
    @inject(TYPES.IAddressRepository)
    repository: IAddressRepository
  ) {
    this._repository = repository;
  }

  async handle_extract_address(command: Command<ExtractAddressRequest>) {
    return await this._repository.extractAddress(command);
  }
  async handle_province(command: Command<ProvinceRequest>) {
    return await this._repository.getProvince(command);
  }
  async handle_ward(command: Command<WardRequest>) {
    return await this._repository.getWard(command);
  }
}
