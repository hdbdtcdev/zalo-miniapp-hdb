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
    token,
  }: {
    file: string;
    token?: string;
    clientSession?: string;
    imgFront?: string;
  }) {
    const fileName = "live_face.jpg";
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

    const identityResponse = await this._dopRepository.compareFace({
      img_front: imgFront,
      img_face: hash,
      client_session: clientSession,
      compare_type: 1,
    });

    if (!identityResponse || !identityResponse.data) {
      throw new Error("Có lỗi xảy ra trong quá trình xác thực khuôn mặt");
    }

    return {
      meta: addResponse.data,
      upload: uploadResponse.data,
      identity: identityResponse.data,
    };
  }
}
