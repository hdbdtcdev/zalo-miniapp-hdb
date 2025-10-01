import { ReduxState } from '@/lib/redux';

export const selectStatus = (state: ReduxState) => state?.cvp_common?.status;
export const selectError = (state: ReduxState) => state?.cvp_common?.error;
export const selectData = (state: ReduxState) => state?.cvp_common?.data;