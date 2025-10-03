import { TYPES } from "@/di/types/types";
import { IJobRepository } from "@/domain/interfaces/job";
import { Command } from "@/domain/models";
import { inject } from "inversify";
import { GetJobRequest } from "./job_body";

export class JobHandler {
  private readonly _repository: IJobRepository;

  constructor(
    @inject(TYPES.IJobRepository)
    repository: IJobRepository
  ) {
    this._repository = repository;
  }

  async get_job_handler(command: Command<GetJobRequest>) {
    return await this._repository.getJob(command);
  }
}
