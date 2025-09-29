import {
  ExtractAddressRequest,
  ExtractAddressRequestData,
  ProvinceRequest,
  ProvinceRequestData,
  WardRequest,
  WardRequestData,
} from "@/application/address/address_body";
import { AddressHandler } from "@/application/address/address_handler";
import { container } from "@/di/inversify.config";
import { TYPES } from "@/di/types/types";
import { Command } from "@/domain/models/command";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProvinceListThunk = createAsyncThunk(
  "/v1/address-provinces",
  async (requestPayload: ProvinceRequestData) => {
    const handler = container.get<AddressHandler>(TYPES.AddressHandler);
    const payloadReq: ProvinceRequest = {
      screenName: "SDKSERVICE-ADDRESS-GET-STATES",
      data: requestPayload,
    };
    const command = new Command({ command: payloadReq });

    return await handler.handle_province(command);
  }
);
export const getWardListThunk = createAsyncThunk(
  "/v1/address-ward",
  async (requestPayload: WardRequestData) => {
    const handler = container.get<AddressHandler>(TYPES.AddressHandler);
    const payloadReq: WardRequest = {
      screenName: "SDKSERVICE-ADDRESS-GET-WARDS",
      data: requestPayload,
    };
    const command = new Command({ command: payloadReq });

    return await handler.handle_ward(command);
  }
);
export const extractAddressThunk = createAsyncThunk(
  "/v1/extract-address",
  async (requestPayload: ExtractAddressRequestData) => {
    const extractAddressHandler = container.get<AddressHandler>(
      TYPES.AddressHandler
    );

    const payloadReq: ExtractAddressRequest = {
      screenName: "SDKSERVICE-EXTRACT-ADDRESS",
      data: requestPayload,
    };
    const command = new Command({ command: payloadReq });

    return await extractAddressHandler.handle_extract_address(command);
  }
);
