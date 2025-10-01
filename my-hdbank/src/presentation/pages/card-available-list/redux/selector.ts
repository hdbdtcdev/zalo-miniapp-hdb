import { ReduxState } from '@/lib/redux';

export const selectStatus = (state: ReduxState) => state?.card_available_list?.status;
export const selectError = (state: ReduxState) => state?.card_available_list?.error;
export const selectCardList = (state: ReduxState) => state?.card_available_list?.cardList;
export const selectCardActive = (state: ReduxState) => state?.card_available_list?.cardActive;