import {
  AddFileResponse,
  DOPAuth,
  IdentifyFrontOCRResponse,
  IdentifyNFCResponse,
  IdentifyRearOCRResponse,
  UploadFileResponse,
} from "@/domain/entities";
import { StatusResponse } from "@/infrastructure/network";

export interface DOPState {
  status: "idle" | "loading" | "succeeded" | "failed";
  responseStatus: StatusResponse | null;
  error: string | null;
  auth: DOPAuth | null;
  front: {
    meta?: AddFileResponse;
    upload?: UploadFileResponse;
    identity?: IdentifyFrontOCRResponse;
  } | null;
  rear: {
    meta?: AddFileResponse;
    upload?: UploadFileResponse;
    identity?: IdentifyRearOCRResponse;
  } | null;
  liveFace: {
    meta?: AddFileResponse;
    upload?: UploadFileResponse;
    identity?: IdentifyRearOCRResponse;
  } | null;
  nfc: {
    identity?: IdentifyNFCResponse;
  } | null;
}

export const initialState: DOPState = {
  status: "idle",
  responseStatus: null,
  error: null,
  auth: null,
  front: null,
  rear: null,
  liveFace: null,
  nfc: null,
};
