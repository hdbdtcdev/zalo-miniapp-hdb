import { CmsPayload, CvpCommonDataRes } from "@/domain/entities/cms/cmsPayload";


export interface ICvpCommonRepository {
    cvpCommon(segment: CmsPayload): Promise<CvpCommonDataRes>;
}
