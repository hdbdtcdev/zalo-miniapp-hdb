import { AddressData, Province, Ward } from "@/domain/entities/address";
import { createSlice } from "@reduxjs/toolkit";
import {
  extractAddressThunk,
  getProvinceListThunk,
  getWardListThunk,
} from "./thunk";
interface AddressState {
  provinceList: Province[] | null;
  addrExtractData: AddressData | null;
  wardList: Ward[] | null;
  loading: boolean | null;
  error: string | null;
}
const initialState: AddressState = {
  provinceList: null,
  loading: true,
  error: null,
  addrExtractData: null,
  wardList: null,
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProvinceListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.provinceList = action.payload.data?.data ?? [];
      })
      .addCase(getProvinceListThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getWardListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWardListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wardList = action.payload.data?.data ?? [];
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
        state.addrExtractData = action.payload.data?.data ?? null;
      });
  },
});
export default addressSlice;
