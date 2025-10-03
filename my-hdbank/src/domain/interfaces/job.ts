import { ApiResponse } from "@/infrastructure/network";
import { GetJobResponse } from "../entities/job";
import { Command } from "../models";

export interface IJobRepository {
  getJob<TParameter>(command: Command<TParameter>): Promise<GetJobResponse>;
}
