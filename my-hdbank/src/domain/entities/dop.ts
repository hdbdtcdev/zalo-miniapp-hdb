export interface DOPAuthRequest {
  client_id: string;
  grant_type: string;
  client_secret: string;
}
export interface DOPAuth {
  access_token?: string;
  transaction_id?: string;
  scope?: string;
  token_type?: string;
  expires_in?: number;
  jti?: string;
}

//
export interface IdentifyFrontOCRRequest {
  type?: number;
  img_front?: string;
  token?: string;
  client_session?: string;
  validate_postcode?: string;
}

export interface FrontOCRObject {
  classify_general: number;
  liveness_card_front: LivenessCardFront;
  ocr: Ocr;
}

export interface LivenessCardFront {
  classify: number;
  response_body: ResponseBody;
  rule_result: RuleResult[];
}

export interface ResponseBody {
  imgs: Imgs;
  message: string;
  server_version: string;
  errors: string[];
  status: string;
  statusCode: number;
}

export interface Imgs {
  img: string;
}

export interface RuleResult {
  uuid_rule_config?: any;
  uuid_rule?: any;
  rule_name?: string;
  json_name?: any;
  data_type?: number;
  value?: string;
  evaluate?: number;
  error_name_vn?: string;
  error_name_en?: string;
}

export interface Ocr {
  classify?: number;
  response_body?: ResponseBody2;
  rule_result?: RuleResult2[];
}

export interface ResponseBody2 {
  imgs?: Imgs2;
  message?: string;
  server_version?: string;
  errors?: string[];
  status?: string;
  statusCode?: number;
}

export interface Imgs2 {
  img_front?: string;
}

export interface RuleResult2 {
  uuid_rule_config?: any;
  uuid_rule?: any;
  rule_name?: string;
  json_name?: any;
  data_type?: number;
  value?: string;
  evaluate?: number;
  error_name_vn?: string;
  error_name_en?: string;
}

export interface IdentifyFrontOCRResponse {
  transaction_id?: string;
  log_id?: string;
  data_base64?: string;
  data_sign?: string;
  ai_version?: any;
  message?: string;
  server_version?: string;
  object?: FrontOCRObject;
}

//
export interface IdentifyRearOCRRequest {
  type?: number;
  img_front?: string;
  img_back?: string;
  token?: string;
  client_session?: string;
  validate_postcode?: string;
  transaction_id?: string;
}

export interface LivenessCardBack {
  classify?: number;
  response_body?: ResponseBody;
  rule_result?: RuleResult[];
}

export interface RearOCRObject {
  liveness_card_back?: LivenessCardBack;
  classify_general?: number;
  ocr?: Ocr;
}

export interface IdentifyRearOCRResponse {
  transaction_id?: string;
  log_id?: string;
  data_base64?: string;
  data_sign?: string;
  ai_version?: any;
  message?: string;
  server_version?: string;
  object?: RearOCRObject;
}

//
export interface IdentifyNFCRequest {
  token?: string;
  status?: boolean;
  client_session?: string;
  imgs?: string[];
  id?: string;
  name?: string;
  birth_day?: string;
  gender?: string;
  nationality?: string;
  ethnic?: string;
  religion?: string;
  origin_location?: string;
  recent_location?: string;
  features?: string;
  issue_date?: string;
  valid_date?: string;
  dad_name?: string;
  mom_name?: string;
  spouse_name?: string;
  old_id?: string;
  img_face?: string;
  img_back?: string;
  mrz?: string[];
  issue_place?: string;
}

export interface IdentifyNFCResponse {
  transaction_id?: string;
  messageFields?: any[];
  log_id?: string;
  data_base64?: string;
  messageObjects?: any[];
  data_sign?: string;
  ai_version?: any;
  message?: string;
  error?: string;
  server_version?: any;
  statusCode?: string;
  status?: string;
}

//
export interface CompareFaceRequest {
  token?: string;
  img_front?: string;
  img_face?: string;
  client_session?: string;
  compare_type?: number;
}

export interface CompareFaceResponse {
  transaction_id?: string;
  log_id?: string;
  data_base64?: string;
  status_code?: number;
  data_sign?: string;
  message?: string;
  server_version?: string;
  errors?: string[];
  AI_version?: string;
}
