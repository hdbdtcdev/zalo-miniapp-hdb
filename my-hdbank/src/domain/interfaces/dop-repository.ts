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
} from "../entities/dop";

export interface IDOPRepository {
  getAuth(body?: DOPAuthRequest): Promise<ApiResponse<DOPAuth> | undefined>;

  identifyFrontOCR(
    body: IdentifyFrontOCRRequest
  ): Promise<ApiResponse<IdentifyFrontOCRResponse> | undefined>;

  identifyRearOCR(
    body: IdentifyFrontOCRRequest
  ): Promise<ApiResponse<IdentifyFrontOCRResponse> | undefined>;

  identifyNFC(
    body: IdentifyNFCRequest
  ): Promise<ApiResponse<IdentifyNFCResponse> | undefined>;

  compareFace(
    body: CompareFaceRequest
  ): Promise<ApiResponse<CompareFaceResponse> | undefined>;
}
