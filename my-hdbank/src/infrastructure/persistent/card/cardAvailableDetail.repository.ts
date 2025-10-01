
import { ApiResponse } from '@/infrastructure/network';
import { BaseService } from '@/infrastructure/services/base-service';
import { injectable } from 'inversify';
import config from '@/config/config.json';
import { Command } from '@/domain/models';
import { CardAvailableDetailDataReq, CardAvailableDetailDataRes } from '@/domain/entities/card/cardAvailableDetail';
import { ICardAvailableDetailRepository } from '@/domain/interfaces/card/card-available-detail';

@injectable()
export class CardAvailableDetailRepository extends BaseService implements ICardAvailableDetailRepository {

    constructor() {
        super(config.BASE_URL || '');
    }

    async fetchCardAvailableDetail<TParameter>(command: Command<TParameter>): Promise<ApiResponse<CardAvailableDetailDataRes[]>> {
        const request = command as unknown as CardAvailableDetailDataReq;
        const url = '/dop-card-details';

        const response = await this.post(
            url,
            request
        )

        console.log(`Card Available Detail: ${JSON.stringify(response)}`);
        return response?.data as ApiResponse<CardAvailableDetailDataRes[]>;
    }
}
