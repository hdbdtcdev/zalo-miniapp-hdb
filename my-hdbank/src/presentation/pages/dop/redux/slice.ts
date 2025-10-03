import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./type";
import {
  getDOPAuthThunk,
  logNFCThunk,
  scanFrontThunk,
  scanLiveFaceThunk,
  scanRearThunk,
} from "./thunk";

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
      })
      // ----------------------------------------------------------------
      // scanFront
      // ----------------------------------------------------------------
      .addCase(scanFrontThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(scanFrontThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch getDOPAuthThunk";
      })
      .addCase(scanFrontThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (!payload) {
          state.status = "failed";
          state.error =
            "Failed to fetch scanFrontThunk because of payload undefined";
          return;
        }

        if (payload) {
          const { meta, upload, identity } = payload;
          state.front = { meta, upload, identity };
        }
      })
      // ----------------------------------------------------------------
      // scanRear
      // ----------------------------------------------------------------
      .addCase(scanRearThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(scanRearThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch getDOPAuthThunk";
      })
      .addCase(scanRearThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (!payload) {
          state.status = "failed";
          state.error =
            "Failed to fetch getDOPAuthThunk because of payload undefined";
          return;
        }

        if (payload) {
          const { meta, upload, identity } = payload;
          state.rear = { meta, upload, identity };
        }
      })
      // ----------------------------------------------------------------
      // scanLiveFace
      // ----------------------------------------------------------------
      .addCase(scanLiveFaceThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(scanLiveFaceThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch getDOPAuthThunk";
      })
      .addCase(scanLiveFaceThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (!payload) {
          state.status = "failed";
          state.error =
            "Failed to fetch scanLiveFaceThunk because of payload undefined";
          return;
        }

        if (payload) {
          const { meta, upload, identity } = payload;
          state.liveFace = { meta, upload, identity };
        }
      })
      // ----------------------------------------------------------------
      // logNFC
      // ----------------------------------------------------------------
      .addCase(logNFCThunk.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(logNFCThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch getDOPAuthThunk";
      })
      .addCase(logNFCThunk.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (!payload) {
          state.status = "failed";
          state.error =
            "Failed to fetch logNFCThunk because of payload undefined";
          return;
        }

        if (payload) {
          const { data } = payload;
          state.nfc = { identity: data };
        }
      });
  },
});

export const { setAuth } = dopSlice.actions;
export default dopSlice.reducer;
