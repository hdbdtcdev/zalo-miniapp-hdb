import { dopSlice } from "@/presentation/pages/dop";
import { cardAvailableSlice } from "@/presentation/pages/home/redux/card-available/slice";

export const reducer = {
  card_available: cardAvailableSlice.reducer,
  dop: dopSlice.reducer,
};
