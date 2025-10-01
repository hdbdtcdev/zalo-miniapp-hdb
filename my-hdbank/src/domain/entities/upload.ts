export interface AddFileRequest {
  file_name: string;
  content_type: string;
  token?: string;
}

export interface AddFileResponse {
  transaction_id: string;
  log_id: string;
  data_base64: string;
  data_sign: string;
  message: string;
  object: AddFileObject;
}

export interface AddFileObject {
  form_data: FormData;
  file_name: string;
  upload_url: string;
  hash: string;
}

export interface FormData {
  "x-amz-date": string;
  "x-amz-signature": string;
  "x-amz-algorithm": string;
  "x-amz-credential": string;
  policy: string;
}

export interface UploadFileRequest {
  "x-amz-date": string;
  "x-amz-signature": string;
  "x-amz-algorithm": string;
  "x-amz-credential": string;
  policy: string;
  "content-Type": string;
  key: string;
  file: string;
  fileName: string;
  uploadUrl: string;
  token?: string;
}

export interface UploadFileResponse extends Object {}
