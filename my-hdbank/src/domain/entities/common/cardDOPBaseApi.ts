export interface CardDOPBaseRequest<T> {
    screenName: string;
    data: T;
    deviceInfo: {
      osVersion: string;
      os: string;
      deviceName: string;
      deviceId: string;
    };
    language: string;
    ipRequest: string;
    channel: string;
    requestId: string;
    accessCode?: string;
    sessionId?: string;
    userName?: string;
  }

  export interface CardDOPBaseResponse<T> {
    resultCode: string;
    resultMessage: string;
    data: T;    
  }
  