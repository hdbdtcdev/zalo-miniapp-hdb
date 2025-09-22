export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  sessionId: string;
  createdTime?: number;
  isPinExpired?: boolean;
}

export interface OnboardingToken {
  accessToken: string;
  expiresIn: number;
}
