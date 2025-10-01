import { CvpCommonDataRes } from '@/domain/entities/cvp_common/cvpCommon';
import { ICvpCommonRepository } from '@/domain/interfaces/cms/cvp_common';
import { Command } from '@/domain/models';
import { ApiResponse } from '@/infrastructure/network';
import { CmsService } from '@/infrastructure/network/cms';
import { injectable } from 'inversify';

@injectable()
export class CvpCommonRepository extends CmsService implements ICvpCommonRepository {
  
  async fetchCvpCommon<TParameter>(segment: Command<TParameter>): Promise<ApiResponse<CvpCommonDataRes[]>> {
        try {
      const response = await this.get<CvpCommonDataRes>('/cvp-commons', 
      //   {
      //   params: {
      //     locale: segment.command['locale'],
      //     populate: segment.command[''] || 'deep,5',
      //     // {
      //     //     cvp_promotion: {
      //     //         populate: 'cvp_promotion_card=*',
      //     //     },
      //     //     cvp_usp: {
      //     //         populate: 'cvp_usp_item=*',
      //     //     },
      //     //     cvp_feature: {
      //     //         populate: 'cvp_feature_item=*',
      //     //     },
      //     //     cvp_faq: {
      //     //         populate: 'cvp_faq_item=*',
      //     //     },
      //     //     tnc_common: '*',
      //     //     cvp_cta_button: '*',
      //     // },
      //     filters: {
      //       domain_code: {
      //         $eq: segment.command['domainCode'], //domain_code tương ứng trên strapi
      //       },
      //       cvp_title: {
      //         $eq: segment.command['cvpTitle'] // cardTitle tương ứng trên strapi
      //       },
      //       is_active: {
      //         $eq: segment.command['isActive'] || true,
      //       },
      //     },
      //   },
      // }
    );

      return response?.data as ApiResponse<CvpCommonDataRes[]> || [];
    } catch (error) {
      throw error;
    }
  }
}
