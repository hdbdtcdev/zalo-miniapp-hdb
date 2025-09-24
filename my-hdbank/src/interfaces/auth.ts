export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  sessionId: string;
  createdTime?: number;
  isPinExpired?: boolean;
  localExpiresIn: number;
}

export interface OnboardingToken {
  accessToken: string;
  expiresIn: number;
}
