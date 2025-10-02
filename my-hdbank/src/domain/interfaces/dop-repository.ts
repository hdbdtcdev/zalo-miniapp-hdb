import { ApiResponse } from "@/infrastructure/network";
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
  IdentifyRearOCRResponse,
} from "../entities/dop";

export interface IDOPRepository {
  getAuth(body?: DOPAuthRequest): Promise<ApiResponse<DOPAuth> | undefined>;

  identifyFrontOCR(
    body: IdentifyFrontOCRRequest
  ): Promise<ApiResponse<IdentifyFrontOCRResponse> | undefined>;

  identifyRearOCR(
    body: IdentifyRearOCRRequest
  ): Promise<ApiResponse<IdentifyRearOCRResponse> | undefined>;

  identifyNFC(
    body: IdentifyNFCRequest
  ): Promise<ApiResponse<IdentifyNFCResponse> | undefined>;

  compareFace(
    body: CompareFaceRequest
  ): Promise<ApiResponse<CompareFaceResponse> | undefined>;
}
