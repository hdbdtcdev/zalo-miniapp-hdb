import { createAsyncThunk } from "@reduxjs/toolkit";
import { TYPES } from "@/di/types/types";
import { container } from "@/di/inversify.config";
import { DOPGetAuthHandler } from "@/application/dop/dop-get-auth-handler";

export const getDOPAuthThunk = createAsyncThunk(
  "dop/get-dop-auth",
  async () => {
    const handler = container.get<DOPGetAuthHandler>(TYPES.DOPGetAuthHandler);
    return await handler.handle();
  }
);
