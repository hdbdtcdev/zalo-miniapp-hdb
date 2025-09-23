import { ReduxState } from '@/lib/redux';

export const selectError = (state: ReduxState) => state.home?.common?.error;

export const selectNetworkType = (state: ReduxState) =>
  state.home?.common?.networkType;
export const selectIsConnectedNetWork = (state: ReduxState) =>
  state.home?.common?.isConnectedNetWork;