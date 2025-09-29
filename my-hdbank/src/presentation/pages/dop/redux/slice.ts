import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./type";
import { getDOPAuthThunk } from "./thunk";

export const dopSlice = createSlice({
  name: "dop",
  initialState: initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setAuth: (state, { payload }) => {
      state.auth = { ...payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ----------------------------------------------------------------
      // getDOPAuth
      // ----------------------------------------------------------------
      .addCase(getDOPAuthThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(getDOPAuthThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch getDOPAuthThunk";
      })
      .addCase(getDOPAuthThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (!payload) {
          state.status = "failed";
          state.error =
            "Failed to fetch getDOPAuthThunk because of payload undefined";
          return;
        }

        const { data } = payload;

        if (!data) {
          return;
        }

        state.auth = data;
      });
  },
});

export const { setAuth } = dopSlice.actions;
export default dopSlice.reducer;
