import { ReduxState } from '@/lib/redux';

export const selectStatus = (state: ReduxState) => state?.card_available?.status;
export const selectError = (state: ReduxState) => state?.card_available?.error;
export const selectCardList = (state: ReduxState) => state?.card_available?.cardList;
export const selectCardActive = (state: ReduxState) => state?.card_available?.cardActive;