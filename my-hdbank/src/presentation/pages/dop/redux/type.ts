import { DOPAuth } from "@/domain/entities";
import { StatusResponse } from "@/infrastructure/network";

export interface DOPState {
  status: "idle" | "loading" | "succeeded" | "failed";
  responseStatus: StatusResponse | null;
  error: string | null;
  auth: DOPAuth | null;
}

export const initialState: DOPState = {
  status: "idle",
  responseStatus: null,
  error: null,
  auth: null,
};
