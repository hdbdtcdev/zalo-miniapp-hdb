import { inject } from "inversify";
import { TYPES } from "@/di/types/types";
import { IDOPRepository } from "@/domain/interfaces";
import { IUploadRepository } from "@/domain/interfaces/upload-repository";
import { AddFileRequest, UploadFileRequest } from "@/domain/entities";

export class DOPScanFrontHandler {
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
    token,
    clientSession,
  }: {
    file: string;
    token?: string;
    clientSession?: string;
  }) {
    const fileName = "cccd_front.jpg";
    const contentType = "image/jpeg";
    const addResponse = await this._uploadRepository.addFile({
      token: token,
      file_name: fileName,
      content_type: contentType,
    } as AddFileRequest);

    if (!addResponse || !addResponse.data) {
      throw new Error("Có lỗi xảy ra trong quá trình lấy URL tải ảnh lên");
    }

    const { form_data, hash, upload_url } = addResponse.data.object;

    const uploadResponse = await this._uploadRepository.uploadFile({
      token: token,
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

    if (uploadResponse?.status?.code !== "200") {
      throw new Error("Có lỗi xảy ra trong quá trình tải ảnh lên");
    }

    const identityResponse = await this._dopRepository.identifyFrontOCR({
      type: -1,
      img_front: hash,
      token: token,
      client_session: clientSession,
      validate_postcode: "1",
    });

    if (!identityResponse || !identityResponse.data) {
      throw new Error("Có lỗi xảy ra trong quá trình nhận diện CCCD");
    }

    return {
      meta: addResponse.data,
      upload: uploadResponse.data,
      identity: identityResponse.data,
    };
  }
}
