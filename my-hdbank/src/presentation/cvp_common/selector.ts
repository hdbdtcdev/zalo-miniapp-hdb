import { ReduxState } from '@/lib/redux';

export const selectStatus = (state: ReduxState) => state?.card_available_detail?.status;
export const selectError = (state: ReduxState) => state?.card_available_detail?.error;
export const selectCvp = (state: ReduxState) => state?.card_available_detail?.card;