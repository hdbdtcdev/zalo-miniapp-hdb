import { inject } from 'inversify';
import { TYPES } from '@/di/types/types';
import { ICvpCommonRepository } from '@/domain/interfaces/cms/cvp_common';
import { Command } from '@/domain/models';
import { CvpCommonDataReq } from '@/domain/entities/cvp_common/cvpCommon';

export class CvpCommonHandler {
    private readonly _repository: ICvpCommonRepository;

    constructor(
        @inject(TYPES.ICvpCommonRepository)
        cvpCommonRepository: ICvpCommonRepository,
    ) {
        this._repository = cvpCommonRepository;
    }

    handle(command: Command<CvpCommonDataReq>) {
        return this._repository.fetchCvpCommon(command);
    }
}
