import { cvpCommonSlice } from "@/presentation/cms/cvp_common";
import { cardAvailableDetailSlice } from "@/presentation/pages/card-available-detail/redux";
import { cardAvailableListSlice } from "@/presentation/pages/card-available-list/redux";

export const reducer = {
  cvp_common: cvpCommonSlice.reducer,
  card_available_list: cardAvailableListSlice.reducer,
  card_available_detail: cardAvailableDetailSlice.reducer,
};
