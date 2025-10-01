
import { CvpCommonAttributes } from "@/domain/entities/cvp_common/cvpCommon";
import { StatusResponse } from "@/infrastructure/network";

export interface CvpCommonState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  responseStatus: StatusResponse | null;
  error: string | null;
  data: CvpCommonAttributes | null;
}

export const initialCvpCommonState: CvpCommonState = {
  status: 'idle',
  responseStatus: null,
  error: null,
  data: null,
};
