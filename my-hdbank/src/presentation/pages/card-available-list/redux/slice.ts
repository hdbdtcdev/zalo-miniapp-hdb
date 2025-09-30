import { createSlice } from '@reduxjs/toolkit';
import { initialCardAvailableState } from './type';
import { fetchCardAvailableListThunk } from './thunk';

export const cardAvailableListSlice = createSlice({
  name: 'home/card_available_list',
  initialState: initialCardAvailableState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setCardActive: (state, { payload }) => {
      // state.cardActive = payload;
      state.cardActive = { ...payload, productCode: payload?.productCode };
    },
    resetCardState: () => initialCardAvailableState,
  },
  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------------------
      // fetchCardAvailableListThunk
      // ----------------------------------------------------------------
      .addCase(fetchCardAvailableListThunk.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCardAvailableListThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch fetchCardAvailableListThunk';
      })
      .addCase(fetchCardAvailableListThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        if (!payload) {
          state.status = 'failed';
          state.error = 'Failed to fetch fetchCardAvailableListThunk because of payload undefined';
          return;
        }
        
        const { data } = payload;

        if (!data) {
          return;
        }

        state.cardList = data;
      });
  },
});

export const { setCardActive } = cardAvailableListSlice.actions;
export default cardAvailableListSlice.reducer;
