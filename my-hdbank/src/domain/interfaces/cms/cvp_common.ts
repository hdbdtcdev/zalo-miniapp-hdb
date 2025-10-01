import { CvpCommonDataRes } from "@/domain/entities/cvp_common/cvpCommon";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";

export interface ICvpCommonRepository {
    fetchCvpCommon<TParameter>(segment: Command<TParameter>): Promise<ApiResponse<CvpCommonDataRes[]>>;
}
