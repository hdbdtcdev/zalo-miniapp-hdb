import { inject } from "inversify";
import { TYPES } from "@/di/types/types";
import { IDOPRepository } from "@/domain/interfaces";

export class DOPGetAuthHandler {
  private readonly _repository: IDOPRepository;

  constructor(
    @inject(TYPES.IDOPRepository)
    repository: IDOPRepository
  ) {
    this._repository = repository;
  }

  async handle() {
    return await this._repository.getAuth();
  }
}
