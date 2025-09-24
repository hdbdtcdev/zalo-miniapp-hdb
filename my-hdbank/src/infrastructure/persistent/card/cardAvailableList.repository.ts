import {
    CardAvailableListDataReq,
    CardAvailableListDataRes
} from '@/domain/entities/cardAvailableList';
import { ICardAvailableListRepository } from '@/domain/interfaces/card-available-list';
import { Command } from '@/domain/models';
import { ApiResponse, HttpService } from '@/infrastructure/network';
import { injectable } from 'inversify';

@injectable()
export class CardAvailableListRepository extends HttpService implements ICardAvailableListRepository {

    async fetchAvailableCards<TParameter>(
        command: Command<TParameter>
    ): Promise<ApiResponse<CardAvailableListDataRes[]>> {
        const request = command as unknown as CardAvailableListDataReq;

        const url = '/dop-card-list-available';
        const response = await this.post(
            url,
            request
        )

        return response?.data as ApiResponse<CardAvailableListDataRes[]>;
    }
}
