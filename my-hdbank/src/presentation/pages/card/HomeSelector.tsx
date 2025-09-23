import { ReduxState } from "@/lib/redux";

export const selectStatus = (state: ReduxState) => state?.home?.status;
export const selectError = (state: ReduxState) => state?.home?.error;
export const selectCardList = (state: ReduxState) => state?.home?.cardList;
export const selectCardActive = (state: ReduxState) => state?.home?.cardActive;
export const selectRequestId = (state: ReduxState) => state?.home?.requestId;
