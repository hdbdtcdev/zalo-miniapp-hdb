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
import { IValidateOcrRepository } from "@/domain/interfaces/validate-ocr";
import { ValidateOcrResponse } from "@/domain/entities/validateOcr";
import { Command } from "@/domain/models";
import { ValidateOcrRequest } from "@/application/validate_ocr/validate_ocr_body";

@injectable()
export class ValidateOcrRepository
  extends BaseService
  implements IValidateOcrRepository
{
  constructor() {
    super(config.BASE_URL || "");
  }
  async validateOcr<TParameter>(
    command: Command<TParameter>
  ): Promise<ValidateOcrResponse> {
    const request = command as unknown as ValidateOcrRequest;
    const url = "/dop-validate-ocr";
    const response = await this.post(url, request);
    return response.data as ValidateOcrResponse;
  }
}
