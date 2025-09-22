import Keys from "../config/config.json"; // tự động parse thành object

export const WEATHER_BASE_URL = 'https://api.open-meteo.com';
export const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com';
export const BASE_URL_LOAN_API = `${Keys.BASE_URL}/api/lending/v1`;
export const BASE_URL_SDK_API = `${Keys.BASE_URL}/api/sdk/v1/`;
export const BASE_URL_SIGNATURRE_API = `${Keys.BASE_URL}/api/signature-service/v1/`;
export const DOMAIN_CDN = 'https://static-cdn.hdbank.com.vn/dibank/loan';
export const DOMAIN_CMS = '';

export const DOCUMENT_VERIFY = 'document_verification';
export const SELFIE_VERIFICATION = 'selfie_verification';
export const NFC_FLOW = 'workflow_nfc';
export const HV_QR_SCAN = 'qr_scan';
export const HV_PASSPORT_VERIFICATION = 'passport_verification';
export const DEFAULT_NO_LIMIT_EXPIRY_DATE_TEXT = {
    NFC: 'KHONG THOI HAN',
    DOCUMENT: 'NO-LIMIT',
};
export const DEFAULT_NO_LIMIT_EXPIRY_DATE = '31-12-2099';

export const DATE_FORMAT_SLASH = 'DD/MM/YYYY';
export const BASE_URL_CARD_DOP_API = `${Keys.BASE_URL}/api/sdk/v1`;

export const PARTNER_ID = 'NEW_DOP';
export const CONTRACT_TYPE = {
    HD: 'CN01',
    HD_DK: 'CN01_SUCCESS',
    VBUQ: 'POA',
    VBUQ_DK: 'POA_SUCCESS',
};
export const NFC_ERROR_CODE: Record<string, string> = {
    '120': 'NFC_NOT_DETECTED',
    '122': 'CARD_GOT_DISCONNECTED',
    'CARD_GOT_DISCONNECTED': '122'
};
export const FACE_NOT_MATCH = '004';
export const EPASS_CODE = 'DOPEPA';
export const DOP_SIGNATURE_SERVICE_CODE = `DOP_ACTIVE_CARD`;