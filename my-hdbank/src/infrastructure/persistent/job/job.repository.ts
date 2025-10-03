import { GetJobRequest } from "@/application/job/job_body";
import config from "@/config/config.json";
import { GetJobResponse } from "@/domain/entities/job";
import { IJobRepository } from "@/domain/interfaces/job";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";

@injectable()
export class JobRepository extends BaseService implements IJobRepository {
  constructor() {
    super(config.BASE_URL || "");
  }
  async getJob<TParameter>(
    command: Command<TParameter>
  ): Promise<GetJobResponse> {
    const request = command as unknown as GetJobRequest;
    const url = "/dop-get-careers-positions";
    const response = await this.post(url, request);
    return response.data as GetJobResponse;
  }
}
