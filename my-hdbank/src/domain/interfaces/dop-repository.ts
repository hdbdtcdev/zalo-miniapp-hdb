import { ApiResponse } from "@/infrastructure/network";
import { DOPAuth } from "../entities/dop";

export interface IDOPRepository {
  getAuth(): Promise<ApiResponse<DOPAuth> | undefined>;
}
