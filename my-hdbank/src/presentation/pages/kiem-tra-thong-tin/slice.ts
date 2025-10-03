import { AddressData, Province, Ward } from "@/domain/entities/address";
import { Career, GetJobResponseData, Position } from "@/domain/entities/job";
import { FullAddress } from "@/presentation/bottomSheet/tinh-thanh-phuong-xa";
import { createSlice } from "@reduxjs/toolkit";
import {
  extractAddressThunk,
  getJobThunk,
  getProvinceListThunk,
  getWardListThunk,
  validateOcr,
} from "./thunk";
import { ValidateOcrResponseData } from "@/domain/entities/validateOcr";
export interface CustomerInfoModel {
  addrPermanent?: FullAddress;
  addrContact?: FullAddress;
  referralCode?: string;
  cmnd?: string;
  career?: Career;
  position?: Position;
  cccd?: string;
  noiCap?: string;
  ngayCap?: string;
  ngayHetHan?: string;
  fullName?: string;
  gioiTinh?: string;
  ngaySinh?: string;
}
interface AddressState {
  provinceList: Province[] | null;
  addrExtractData: AddressData | null;
  wardList: Ward[] | null;
  loading: boolean | null;
  error: string | null;
  customerInfo: CustomerInfoModel;
  jobData: GetJobResponseData | null;
  validateOcrResp: ValidateOcrResponseData | null;
}
const initialState: AddressState = {
  provinceList: null,
  loading: true,
  error: null,
  addrExtractData: null,
  wardList: null,
  customerInfo: {
    cccd: "123456789123",
    noiCap: "Cục CS ĐKQL cư trú-DLQG dân cư",
    ngayHetHan: "31/12/2030",
    cmnd: "001304027098",
    ngayCap: "01/01/2020",
    ngaySinh: "01/01/2020",
    fullName: "DANG TIEN ANH",
    gioiTinh: "Nam",
  },
  jobData: null,
  validateOcrResp: null,
};
const customerInfoSlice = createSlice({
  name: "customerInfo",
  initialState,
  reducers: {
    updateAddrPermanet: (state, { payload }) => {
      if (state.customerInfo) {
        state.customerInfo = {
          ...state.customerInfo,
          addrPermanent: payload,
        };
      }
    },
    updateAddrContact: (state, { payload }) => {
      if (state.customerInfo) {
        state.customerInfo = {
          ...state.customerInfo,
          addrContact: payload,
        };
      }
    },
    updateCustomerInfo: (state, { payload }) => {
      if (state.customerInfo) {
        state.customerInfo = {
          ...state.customerInfo,
          ...payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProvinceListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.provinceList = action.payload?.data ?? [];
      })
      .addCase(getProvinceListThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getWardListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWardListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wardList = action.payload?.data ?? [];
      })
      .addCase(getWardListThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(extractAddressThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(extractAddressThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(extractAddressThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.addrExtractData = action.payload?.data ?? null;
      })
      .addCase(getJobThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getJobThunk.fulfilled, (state, action) => {
        state.loading = false;
        const resultcode = action.payload.resultCode;
        if (resultcode === "00") {
          state.jobData = action.payload.data ?? null;
        }
      })
      .addCase(validateOcr.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateOcr.rejected, (state) => {
        state.loading = false;
      })
      .addCase(validateOcr.fulfilled, (state, action) => {
        state.loading = false;
        const resultcode = action.payload.resultCode;
        if (resultcode === "00") {
          state.validateOcrResp = action.payload.data ?? null;
        }
      });
  },
});
export const { updateAddrContact, updateAddrPermanet, updateCustomerInfo } =
  customerInfoSlice.actions;
export default customerInfoSlice;
