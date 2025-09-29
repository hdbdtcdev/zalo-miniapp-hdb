import {
  CardAvailableListDataReq,
  CardAvailableListDataRes,
} from "@/domain/entities/cardAvailableList";
import { ICardAvailableListRepository } from "@/domain/interfaces/card-available-list";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";
import config from "@/config/config.json";
import { IDOPRepository } from "@/domain/interfaces";
import { DOPAuth } from "@/domain/entities/dop";

@injectable()
export class DOPRepository extends BaseService implements IDOPRepository {
  constructor() {
    //super(config.BASE_URL || "");
    super("https://biometric-uat.hdbank.com.vn");
  }

  async getAuth(): Promise<ApiResponse<DOPAuth> | undefined> {
    const response = await this.post<ApiResponse<DOPAuth>>(
      "/auth/oauth/token",
      {
        client_id: "idgv2-type31-d63d8db4-2322-4f76-b5df-bc43d37c7c13",
        grant_type: "client_credentials",
        client_secret: "iD#0Ysq#p^6VtVmUb%LGB9dV",
      }
    );
    return response.data;
  }
}
