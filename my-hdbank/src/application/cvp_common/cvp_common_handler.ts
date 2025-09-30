import { inject } from 'inversify';
import { TYPES } from '@/di/types/types';
import { CmsPayload } from '@/domain/entities/cms/cmsPayload';
import { ICvpCommonRepository } from '@/domain/interfaces/cms/cvp_common';

export class CvpCommonHandler {
    private readonly _repository: ICvpCommonRepository;

    constructor(
        @inject(TYPES.ICvpCommonRepository)
        cvpCommonRepository: ICvpCommonRepository,
    ) {
        this._repository = cvpCommonRepository;
    }

    handle(segment: CmsPayload) {
        return this._repository.cvpCommon(segment);
    }
}
