import { createSlice } from '@reduxjs/toolkit';
import { FetchingStatus, initialCommonState } from './type';

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    resetHomepage: (state) => {
      state.error = null;
      state.status = FetchingStatus.IDLE;
    },
    setNetworkType: (state, action) => {
      state.networkType = action.payload;
    },
    setIsConnectedNetWork: (state, action) => {
      state.isConnectedNetWork = action.payload;
    },
  },
  extraReducers: (builder) => { }
});
