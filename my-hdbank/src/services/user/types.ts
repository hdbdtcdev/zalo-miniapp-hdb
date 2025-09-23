// MARK: - ID Token
export interface IndividualUser {
  gender: string;
  mail: string;
  phone: string;
  name: string;
  clientNo: string;
  clientType: string | null;
  mfa?: string[] | null;
  mfaDefault?: string | null;
  hdbId: string;
  mediaType: string | null;
  userId: string;
  birthDate: string;
  dateOfIssuance: string | null;
  expiryDate: string | null;
  avatar: string | null;
  priorityCusInfo: Record<string, unknown> | null;
  clientIndicator: string | null;
  extra: Extra;
  permanentAddress?: string;
  currentAddress?: string;
  nationality?: string;
  globalId?: string;
  s3Status?: string;
  nameVn?: string;
  clientNameVn?: string;
}

interface Extra {
  loyaltyHDBMemberId: string;
}

export interface CorporationUser {
  gender: string;
  phone: string;
  biometricKey: string;
  name: string;
  clientNo: string;
  mfa: string;
  mediaType: string | null;
  userId: string;
  birthDate: string;
}

export interface UserData {
  extend: Record<string, unknown>;
  CORP?: CorporationUser[] | [];
  INDI?: IndividualUser | null;
  exp: number;
  iat: number;
}

// MARK: - Access Token
export interface IndividualAccessToken {
  featureList: string | null;
  customerType: string | null;
  domain: string | null;
  clientNo: string | null;
  ekycLevel: string | null;
  userRole: string | null;
  userId: string | null;
  deviceId: string | null;
}

export interface AccessTokenData {
  extend: Record<string, unknown>;
  CORP?: [];
  INDI?: IndividualAccessToken | null;
  sessionId: string;
  exp: number;
  iat: number;
}
