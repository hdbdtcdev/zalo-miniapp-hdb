// import addressSlice from '@src/presentation/components/bottomSheet/address/redux/slice';
// import cardSlice from '@src/presentation/dop_card/redux/cardSlice';
// import OCRSlice from '@src/presentation/dop_ocr/redux/slice';
// import CVPSlice from '@src/presentation/dop_cvp/redux/CVPSlice';
// import { DOPSlice } from '@src/presentation/dop_confirm/redux/slice';
// import DOPPasswordSlice from '@src/presentation/dop_password/redux/slice';
// import DOPLoginSlice from '@src/presentation/dop_login/redux/slice';
// import { EsignSlice } from '@src/presentation/card_activation/redux/slice';
// import { EsignEasycaSlice } from '@src/presentation/esign_easy_ca/redux/slice';
import { cardAvailableSlice } from "@/presentation/pages/home/redux/card-available/slice";

import cardSlice from "@/presentation/pages/them-thong-tin/redux/cardSlice";
export const reducer = {
  card: cardSlice.reducer,
  card_available: cardAvailableSlice.reducer,
};
