import { ReduxState } from "@/lib/redux";
import { CustomerInfoModel } from "./slice";
import { GetJobResponseData } from "@/domain/entities/job";
import { ValidateOcrResponseData } from "@/domain/entities/validateOcr";

export const selectCustomerInfo = (state: ReduxState) =>
  state.customerInfo?.customerInfo ?? ({} as CustomerInfoModel);
export const selectJobData = (state: ReduxState) =>
  state.customerInfo?.jobData ?? ({} as GetJobResponseData);
export const selectValidateOcrData = (state: ReduxState) =>
  state.customerInfo?.validateOcrResp ?? ({} as ValidateOcrResponseData);
