import {
    CardAvailableListDataReq,
    CardAvailableListDataRes
} from '@/domain/entities/cardAvailableList';
import { ICardAvailableListRepository } from '@/domain/interfaces/card-available-list';
import { Command } from '@/domain/models';
import { ApiResponse } from '@/infrastructure/network';
import { BaseService } from '@/infrastructure/services/base-service';
import { injectable } from 'inversify';
import config from '@/config/config.json';

@injectable()
export class CardAvailableListRepository extends BaseService implements ICardAvailableListRepository {

    constructor() {
        super(config.BASE_URL || '');
    }

    async fetchAvailableCards<TParameter>(
        command: Command<TParameter>
    ): Promise<ApiResponse<CardAvailableListDataRes[]>> {
        const request = command as unknown as CardAvailableListDataReq;
        const url = '/dop-card-list-available';

        const response = await this.post(
            url,
            request
        )

        console.log(`Card Available List: ${JSON.stringify(response)}`);
        
        return response?.data as ApiResponse<CardAvailableListDataRes[]>;
    }
}
