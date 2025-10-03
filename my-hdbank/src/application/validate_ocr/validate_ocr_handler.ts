import { TYPES } from "@/di/types/types";
import { IValidateOcrRepository } from "@/domain/interfaces/validate-ocr";
import { Command } from "@/domain/models";
import { inject } from "inversify";
import { ValidateOcrRequest } from "./validate_ocr_body";

export class ValideOcrHandler {
  private readonly _repository: IValidateOcrRepository;

  constructor(
    @inject(TYPES.IValidateOcrRepository)
    repository: IValidateOcrRepository
  ) {
    this._repository = repository;
  }

  async handle(command: Command<ValidateOcrRequest>) {
    return await this._repository.validateOcr(command);
  }
}
