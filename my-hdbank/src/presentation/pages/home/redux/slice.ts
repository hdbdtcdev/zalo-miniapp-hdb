import cardAvailableSlice from "./card-available/slice";
import { commonSlice } from "./common/slice";

export const HomeAction = {
  ...commonSlice.actions,
  ...cardAvailableSlice.actions,
};