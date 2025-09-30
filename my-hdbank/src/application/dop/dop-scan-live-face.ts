import { inject } from "inversify";
import { TYPES } from "@/di/types/types";
import { IDOPRepository } from "@/domain/interfaces";
import { IUploadRepository } from "@/domain/interfaces/upload-repository";
import { AddFileRequest, UploadFileRequest } from "@/domain/entities";

export class DOPScanLiveFaceHandler {
  private readonly _uploadRepository: IUploadRepository;
  private readonly _dopRepository: IDOPRepository;

  constructor(
    @inject(TYPES.IDOPRepository)
    dopRepository: IDOPRepository,
    @inject(TYPES.IUploadRepository)
    uploadRepository: IUploadRepository
  ) {
    this._dopRepository = dopRepository;
    this._uploadRepository = uploadRepository;
  }

  async handle({
    file,
    clientSession,
    imgFront,
  }: {
    file: string;
    token: string;
    clientSession: string;
    imgFront?: string;
  }) {
    const fileName = "live_face.jpg";
    const contentType = "image/jpeg";
    const addResponse = await this._uploadRepository.addFile({
      file_name: fileName,
      content_type: contentType,
    } as AddFileRequest);

    if (!addResponse || !addResponse.data) {
      throw new Error("Failed to get upload URL");
    }

    const { form_data, hash, upload_url } = addResponse.data.object;

    const uploadResponse = await this._uploadRepository.uploadFile({
      "x-amz-date": form_data["x-amz-date"],
      "x-amz-signature": form_data["x-amz-signature"],
      "x-amz-algorithm": form_data["x-amz-algorithm"],
      "x-amz-credential": form_data["x-amz-credential"],
      policy: form_data.policy,
      "content-Type": contentType,
      key: hash,
      file: file,
      fileName: fileName,
      uploadUrl: upload_url,
    } as UploadFileRequest);

    if (!uploadResponse) {
      throw new Error("Failed to upload file");
    }

    const identityResponse = await this._dopRepository.compareFace({
      img_front: imgFront,
      img_face: hash,
      client_session: clientSession,
      compare_type: 1,
    });

    if (!identityResponse || !identityResponse.data) {
      throw new Error("Failed to identify live face");
    }

    return {
      meta: addResponse.data,
      upload: uploadResponse,
      identity: identityResponse.data,
    };
  }
}
