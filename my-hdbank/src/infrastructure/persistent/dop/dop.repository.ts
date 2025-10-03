import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";
import config from "@/config/config.json";
import { IDOPRepository } from "@/domain/interfaces";
import {
  CompareFaceRequest,
  CompareFaceResponse,
  DOPAuth,
  DOPAuthRequest,
  IdentifyFrontOCRRequest,
  IdentifyFrontOCRResponse,
  IdentifyNFCRequest,
  IdentifyNFCResponse,
  IdentifyRearOCRRequest,
} from "@/domain/entities/dop";

@injectable()
export class DOPRepository extends BaseService implements IDOPRepository {
  constructor() {
    super(config.BIO_BASE_URL || "");
  }

  async getAuth(
    body?: DOPAuthRequest
  ): Promise<ApiResponse<DOPAuth> | undefined> {
    const response = await this.post<DOPAuth>(
      "/auth/oauth/token",
      body ?? {
        client_id: "idgv2-type31-d63d8db4-2322-4f76-b5df-bc43d37c7c13",
        grant_type: "client_credentials",
        client_secret: "iD#0Ysq#p^6VtVmUb%LGB9dV",
      }
    );
    return response;
  }

  async identifyFrontOCR(
    body: IdentifyFrontOCRRequest
  ): Promise<ApiResponse<IdentifyFrontOCRResponse> | undefined> {
    return this.post(
      "/ai/v1/ocr/id/front",
      { ...body, token: "token" },
      {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }
    );
  }

  identifyRearOCR(
    body: IdentifyRearOCRRequest
  ): Promise<ApiResponse<IdentifyFrontOCRResponse> | undefined> {
    return this.post(
      "/ai/v1/ocr/id",
      { ...body, token: "token" },
      {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }
    );
  }

  identifyNFC(
    body: IdentifyNFCRequest
  ): Promise<ApiResponse<IdentifyNFCResponse> | undefined> {
    return this.post(
      "/ai/v1/nfc",
      { ...body, token: "token" },
      {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }
    );
  }

  compareFace(
    body: CompareFaceRequest
  ): Promise<ApiResponse<CompareFaceResponse> | undefined> {
    return this.post("/face-service/v1/face/compare", body, {
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    });
  }
}
