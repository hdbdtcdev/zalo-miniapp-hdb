import type { AccessTokenData, UserData } from './types';
import { AuthToken } from '@/interfaces';
import { globalDataService, GlobalKey } from '../global-data';


export class UserService {
  static async getUser(): Promise<UserData | null> {
    return null;
  }

  static async setIdToken(idToken: string): Promise<void> {
   
  }

  static async clearIdToken(): Promise<void> {
   
  }

  static async getIdToken(): Promise<string | null> {
    return null;
  }

  static setAuthToken(accessToken: string, refreshToken: string) {
  }

  static clearAuthToken() {
  }

  static getAuthToken(): AuthToken | null {
    try {
      const rawData = globalDataService.get<string>(GlobalKey.USER_AUTH);
      if (!rawData) return null;

      const parsed: unknown = JSON.parse(rawData);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'accessToken' in parsed
      ) {
        return parsed as AuthToken;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  static getAccessTokenData(): AccessTokenData | null {
    try {
      const userAuth = UserService.getAuthToken();
      const token = userAuth?.accessToken;
      if (!token) return null;

      return null;
    } catch (error) {
      return null;
    }
  }
}
