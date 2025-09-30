import { CmsPayload, CvpCommonDataRes } from '@/domain/entities/cms/cmsPayload';
import { ICvpCommonRepository } from '@/domain/interfaces/cms/cvp_common';
import { CmsService } from '@/infrastructure/network/cms';
import { injectable } from 'inversify';

@injectable()
export class CvpCommonRepository extends CmsService implements ICvpCommonRepository {
  constructor() {
    super();
  }

  async cvpCommon(payload: CmsPayload): Promise<CvpCommonDataRes> {
    try {
      const response = await this.get<CvpCommonDataRes>('/cvp-commons', {
        params: {
          locale: payload.locale,
          populate: 'deep,5',
          // {
          //     cvp_promotion: {
          //         populate: 'cvp_promotion_card=*',
          //     },
          //     cvp_usp: {
          //         populate: 'cvp_usp_item=*',
          //     },
          //     cvp_feature: {
          //         populate: 'cvp_feature_item=*',
          //     },
          //     cvp_faq: {
          //         populate: 'cvp_faq_item=*',
          //     },
          //     tnc_common: '*',
          //     cvp_cta_button: '*',
          // },
          filters: {
            domain_code: {
              $eq: payload.segment, //domain_code tương ứng trên strapi
            },
            cvp_title: {
              $eq: payload.cardTitle, //cardTitle tương ứng trên strapi
            },
            is_active: {
              $eq: true,
            },
          },
        },
      });
      return (response.data as CvpCommonDataRes) ?? null;
    } catch (error) {
      throw error;
    }
  }
}
