import { createSlice } from '@reduxjs/toolkit';
import { initialCvpCommonState } from './type';
import { fetchCvpCommonThunk } from './thunk';

export const cvpCommonSlice = createSlice({
  name: 'cvp_common',
  initialState: initialCvpCommonState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    resetCardState: () => initialCvpCommonState,
  },
  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------------------
      // fetchCvpCommonThunk
      // ----------------------------------------------------------------
      .addCase(fetchCvpCommonThunk.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCvpCommonThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch fetchCvpCommonThunk';
      })
      .addCase(fetchCvpCommonThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        if (!payload) {
          state.status = 'failed';
          state.error = 'Failed to fetch fetchCvpCommonThunk because of payload undefined';
          return;
        }
        
        const { data } = payload;

        if (!data) {
          return;
        }

        state.data = payload.data?.[0].attributes ?? null;
      });
  },
});

export const { resetCardState } = cvpCommonSlice.actions;
export default cvpCommonSlice.reducer;
