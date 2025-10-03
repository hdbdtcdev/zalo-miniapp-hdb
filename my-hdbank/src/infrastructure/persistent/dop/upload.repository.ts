import { ApiResponse } from "@/infrastructure/network";
import { BaseService } from "@/infrastructure/services/base-service";
import { injectable } from "inversify";
import config from "@/config/config.json";
import { IUploadRepository } from "@/domain/interfaces/upload-repository";
import {
  AddFileRequest,
  AddFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from "@/domain/entities";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";

@injectable()
export class UploadRepository extends BaseService implements IUploadRepository {
  constructor() {
    super("");
  }

  base64ToBlob(base64: string, contentType = "image/jpeg"): Blob {
    const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;
    const byteCharacters = atob(base64Data);
    const byteArrays: BlobPart[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers); // ArrayBufferView
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  async addFile(
    body: AddFileRequest
  ): Promise<ApiResponse<AddFileResponse> | undefined> {
    return await this.post(
      `${config.BIO_BASE_URL}/file-service/v1/addFile`,
      body,
      {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }
    );
  }

  async uploadFile(
    body: UploadFileRequest
  ): Promise<ApiResponse<UploadFileResponse> | undefined> {
    // Convert base64 -> Blob
    const blob = this.base64ToBlob(body.file, "image/jpeg");
    console.log("Blob size:", blob.size);
    console.log("Form data to be sent:", body);

    const form = new FormData();
    form.append("x-amz-date", body["x-amz-date"]);
    form.append("x-amz-signature", body["x-amz-signature"]);
    form.append("x-amz-algorithm", body["x-amz-algorithm"]);
    form.append("x-amz-credential", body["x-amz-credential"]);
    form.append("policy", body.policy);
    form.append("content-Type", "image/jpeg");
    form.append("key", body.key);

    form.append("file", blob, body.fileName);

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (event.lengthComputable) {
          const percent = Math.round(
            ((event.loaded ?? 0) * 100) / (event.total ?? 1)
          );
          console.log("Upload progress:", percent, "%");
        }
      },
    };
    return await this.post(body.uploadUrl, form, config);
  }
}
