import { createAsyncThunk } from "@reduxjs/toolkit";
import { TYPES } from "@/di/types/types";
import { container } from "@/di/inversify.config";
import { DOPGetAuthHandler } from "@/application/dop/dop-get-auth-handler";
import { DOPLogNFCHandler } from "@/application/dop/dop-log-nfc-handler";
import { DOPScanFrontHandler } from "@/application/dop/dop-scan-front-handler";
import { DOPScanLiveFaceHandler } from "@/application/dop/dop-scan-live-face-handler";
import { DOPScanRearHandler } from "@/application/dop/dop-scan-rear-handler";
import { IdentifyNFCRequest } from "@/domain/entities";

export const getDOPAuthThunk = createAsyncThunk(
  "dop/get-dop-auth",
  async () => {
    const handler = container.get<DOPGetAuthHandler>(TYPES.DOPGetAuthHandler);
    return await handler.handle();
  }
);

export const scanFrontThunk = createAsyncThunk(
  "dop/scan-front",
  async (payload: { file: string; token?: string; clientSession?: string }) => {
    const handler = container.get<DOPScanFrontHandler>(
      TYPES.DOPScanFrontHandler
    );
    return await handler.handle(payload);
  }
);

export const scanRearThunk = createAsyncThunk(
  "dop/scan-rear",
  async (payload: {
    file: string;
    token?: string;
    clientSession?: string;
    imgFront?: string;
  }) => {
    const handler = container.get<DOPScanRearHandler>(TYPES.DOPScanRearHandler);
    return await handler.handle(payload);
  }
);

export const scanLiveFaceThunk = createAsyncThunk(
  "dop/scan-live-face",
  async (payload: {
    file: string;
    token?: string;
    clientSession?: string;
    imgFront?: string;
  }) => {
    const handler = container.get<DOPScanLiveFaceHandler>(
      TYPES.DOPScanLiveFaceHandler
    );
    return await handler.handle(payload);
  }
);

export const logNFCThunk = createAsyncThunk(
  "dop/log-nfc",
  async (nfcData: IdentifyNFCRequest) => {
    const handler = container.get<DOPLogNFCHandler>(TYPES.DOPLogNFCHandler);
    return await handler.handle({ nfcData });
  }
);
