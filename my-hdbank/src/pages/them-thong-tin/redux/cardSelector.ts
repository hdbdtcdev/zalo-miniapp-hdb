import { ReduxState } from "@/lib/redux";

export const selectStatus = (state: ReduxState) => state?.card?.status;
export const selectError = (state: ReduxState) => state?.card?.error;

export const selectEmail = (state: ReduxState) =>
  state?.card?.dataPayload.email;
export const selectref1MobilePhone = (state: ReduxState) =>
  state?.card?.dataPayload.ref1MobilePhone;
export const selectRef2MobilePhone = (state: ReduxState) =>
  state?.card?.dataPayload?.ref2MobilePhone;
export const selectCompanyName = (state: ReduxState) =>
  state?.card?.dataPayload?.companyName;
export const selectIncome = (state: ReduxState) =>
  state?.card?.dataPayload?.income;

// export const selectAddressType = (state: ReduxState) => state.card.addressType;
export const selectAddrDetail = (state: ReduxState) => state?.card?.addrDetail;

export const selectCompanyAddressDetail = (state: ReduxState) =>
  state.card.companyAddressDetail;
export const selectProvinceId = (state: ReduxState) => state?.card?.provinceId;
export const selectProvinceName = (state: ReduxState) =>
  state?.card?.provinceName;
export const selectDistrictId = (state: ReduxState) => state?.card?.districtId;
export const selectDistrictName = (state: ReduxState) =>
  state?.card?.districtName;
export const selectWardId = (state: ReduxState) => state?.card?.wardId;
export const selectWardName = (state: ReduxState) => state?.card?.wardName;

export const selectDataPayload = (state: ReduxState) =>
  state?.card?.dataPayload;
// export const selectDopSubmitData = (state: ReduxState) =>
//   state?.card?.dopSubmitV2;
export const selectCompanyProvinceId = (state: ReduxState) =>
  state?.card?.companyProvinceId;
export const selectCompanyDistrictId = (state: ReduxState) =>
  state?.card?.companyDistrictId;
export const selectCompanyWardId = (state: ReduxState) =>
  state?.card?.companyWardId;
// export const selectCardStaticData = (state: ReduxState) =>
//   state?.card?.cardStaticData;
