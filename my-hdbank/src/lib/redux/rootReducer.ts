// import addressSlice from '@src/presentation/components/bottomSheet/address/redux/slice';
// import cardSlice from '@src/presentation/dop_card/redux/cardSlice';
// import OCRSlice from '@src/presentation/dop_ocr/redux/slice';
// import CVPSlice from '@src/presentation/dop_cvp/redux/CVPSlice';
// import { DOPSlice } from '@src/presentation/dop_confirm/redux/slice';
// import DOPPasswordSlice from '@src/presentation/dop_password/redux/slice';
// import DOPLoginSlice from '@src/presentation/dop_login/redux/slice';
// import { EsignSlice } from '@src/presentation/card_activation/redux/slice';
// import { EsignEasycaSlice } from '@src/presentation/esign_easy_ca/redux/slice';

import DOPHomeSlice from "@/pages/trang-chu/DOPHomeSlice";

export const reducer = {
    // address: addressSlice.reducer,
    // ocr: OCRSlice.reducer,
    // card: cardSlice.reducer,
    // cvp: CVPSlice.reducer,
    // dop: DOPSlice.reducer,
    // dopPassword: DOPPasswordSlice.reducer,
    // dopLogin: DOPLoginSlice.reducer,
    home: DOPHomeSlice.reducer,
    // esign: EsignSlice.reducer,
    // esignEasyca: EsignEasycaSlice.reducer,
};
