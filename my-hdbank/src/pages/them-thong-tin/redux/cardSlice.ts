import { createSlice } from "@reduxjs/toolkit";
export interface CustomerInfoV2DataReq {
  leadId: string;
  email: string;
  ref1MobilePhone: string;
  ref2MobilePhone: string;
  company: string;
  companyAddress: string;
  income: string;
  licensePlate: string;
  licensePlateType: string;
  ePassReferralCode: string;
  workingAddressProvinceId: string;
  workingAddressDistrictId: string;
  workingAddressWardId: string;
  workingAddressDetail: string;
  averageAmountEpass?: string;
  companyName?: string;
}
export interface IStateCardSlice {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  addrDetail: string;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;

  companyAddressDetail?: string;
  companyProvinceId?: string;
  companyProvinceName?: string;
  companyDistrictId?: string;
  companyDistrictName?: string;
  companyWardId?: string;
  companyWardName?: string;

  dataPayload: CustomerInfoV2DataReq;
  queue: Record<string, string>;
}

const initialState: IStateCardSlice = {
  status: "idle",
  error: "",
  //   addressTypeList: [
  //     { type: "01", name: "Địa chỉ liên hệ" },
  //     { type: "02", name: "Nơi làm việc" },
  //     { type: "03", name: "Khác" }, //Nơi thường trú
  //   ],
  //   addressType: { type: "01", name: "Địa chỉ liên hệ" },
  addrDetail: "",
  provinceId: "",
  provinceName: "",
  districtId: "",
  districtName: "",
  wardId: "",
  wardName: "",

  companyAddressDetail: "",
  companyProvinceId: "",
  companyProvinceName: "",
  companyDistrictId: "",
  companyDistrictName: "",
  companyWardId: "",
  companyWardName: "",

  dataPayload: {
    email: "",
    ref1MobilePhone: "",
    ref2MobilePhone: "",
    companyName: "",
    companyAddress: "",
    income: "",
    licensePlate: "",
    licensePlateType: "",
    ePassReferralCode: "",
    leadId: "",
    company: "",
    workingAddressProvinceId: "",
    workingAddressDistrictId: "",
    workingAddressWardId: "",
    workingAddressDetail: "",
    averageAmountEpass: "",
  },
  queue: {},
  //   dopSubmitV2: {} as DopSubmitV2DataRes,
  //   cardStaticData: [],
};

const cardSlice = createSlice({
  name: "loan_collateral_amount",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setProvince: (state, { payload }) => {
      state.provinceId = payload?.provinceId;
      state.provinceName = payload?.provinceName;
    },
    setDistrict: (state, { payload }) => {
      state.districtId = payload?.districtId;
      state.districtName = payload?.districtName;
    },
    setWard: (state, { payload }) => {
      state.wardId = payload?.wardId;
      state.wardName = payload?.wardName;
    },
    setDataPayload: (state, { payload }) => {
      Object.assign(state.dataPayload, payload);
      // state.dataPayload = {
      //     ...state.dataPayload,
      //     ...payload,
      // };
    },

    setAddrDetail: (state, { payload }) => {
      state.addrDetail = payload;
    },

    setCompanyAddressDetail: (state, { payload }) => {
      state.companyAddressDetail = payload;
    },
    setCompanyProvince: (state, { payload }) => {
      state.companyProvinceId = payload?.provinceId;
      state.companyProvinceName = payload?.provinceName;
    },
    setCompanyDistrict: (state, { payload }) => {
      state.companyDistrictId = payload?.districtId;
      state.companyDistrictName = payload?.districtName;
    },
    setCompanyWard: (state, { payload }) => {
      state.companyWardId = payload?.wardId;
      state.companyWardName = payload?.wardName;
    },
    setCompanyAddress: (state, { payload }) => {
      state.dataPayload.companyAddress = `${payload || ""}, ${state.companyWardName || ""}, ${state.companyDistrictName || ""}, ${
        state.companyProvinceName || ""
      }`;
    },
    // setCardStaticData: (state, { payload }) => {
    //   state.cardStaticData = payload;
    // },
    resetCard: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});
export const { resetCard, setDataPayload } = cardSlice.actions;
export default cardSlice;
