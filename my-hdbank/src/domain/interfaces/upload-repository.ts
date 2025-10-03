import { ApiResponse } from "@/infrastructure/network";
import {
  AddFileRequest,
  AddFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from "../entities";

export interface IUploadRepository {
  addFile(
    body: AddFileRequest
  ): Promise<ApiResponse<AddFileResponse> | undefined>;

  uploadFile(
    body: UploadFileRequest
  ): Promise<ApiResponse<UploadFileResponse> | undefined>;
}
