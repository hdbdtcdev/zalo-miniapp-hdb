import { injectable } from 'inversify';
import { CardListAvailableDataReq, CardListAvailableDataRes } from '@/domain/entities/cardListAvailable';
import { HttpService } from '@/apis/http.services';
import { CardDOPBaseResponse } from '@/domain/entities/common/cardDOPBaseApi';
import { Query } from '@/domain/model/query';
import { ICardListAvailableRepository } from '../interface/cardListAvailable';
import { BASE_URL_CARD_DOP_API } from '@/config';

@injectable()
export class CardListAvailableRepository
    extends HttpService
    implements ICardListAvailableRepository {
    constructor() {
        super({ baseURL: BASE_URL_CARD_DOP_API });
    }

    async cardListAvailable<TParameter>(query: Query<TParameter>): Promise<CardDOPBaseResponse<CardListAvailableDataRes[]>> {
        const request = query.query as unknown as CardListAvailableDataReq;
        const url = '/dop-card-list-available';
        const response = await this.post(url, request)
        return response.data as CardDOPBaseResponse<CardListAvailableDataRes[]>;
    }
}
