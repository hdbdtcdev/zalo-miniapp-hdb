import { createSlice } from '@reduxjs/toolkit';
import { fetchCardAvailableDetailThunk } from './thunk';
import { initialCardAvailableDetailState } from './type';

export const cardAvailableDetailSlice = createSlice({
  name: 'card_available_detail',
  initialState: initialCardAvailableDetailState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    resetCardState: () => initialCardAvailableDetailState,
  },
  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------------------
      // fetchCardAvailableDetailThunk
      // ----------------------------------------------------------------
      .addCase(fetchCardAvailableDetailThunk.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchCardAvailableDetailThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch fetchCardAvailableDetailThunk';
      })
      .addCase(fetchCardAvailableDetailThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        if (!payload) {
          state.status = 'failed';
          state.error = 'Failed to fetch fetchCardAvailableDetailThunk because of payload undefined';
          return;
        }
        
        const { data } = payload;

        if (!data) {
          return;
        }

        state.card = data[0] || null;
      });
  },
});

export const { resetCardState } = cardAvailableDetailSlice.actions;
export default cardAvailableDetailSlice.reducer;
