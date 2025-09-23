import { NetworkType } from "zmp-sdk";

export enum FetchingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  F = 'F',
}

interface CommonState {
  status: FetchingStatus;
  error: string | null;
  networkType: NetworkType;
  isConnectedNetWork: boolean;
}

export const initialCommonState: CommonState = {
  status: FetchingStatus.IDLE,
  error: null,
  networkType: NetworkType.none,
  isConnectedNetWork: true
};
