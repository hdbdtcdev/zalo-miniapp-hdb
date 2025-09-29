import { ReduxState } from "@/lib/redux";

export const selectStatus = (state: ReduxState) => state?.dop?.status;
export const selectError = (state: ReduxState) => state?.dop?.error;
export const selectAuth = (state: ReduxState) => state?.dop?.auth;
