import {inject} from 'inversify';
import { TYPES } from '@/di/types/types';
import { Query } from '@/domain/model/query';
import { CardDOPBaseRequest } from '@/domain/entities/common/cardDOPBaseApi';
import { CardListAvailableDataReq } from '@/domain/entities/cardListAvailable';
import { ICardListAvailableRepository } from '@/infra/interface/cardListAvailable';

export class CardListAvailableHandler {
    private readonly _repository: ICardListAvailableRepository;

    constructor(
        @inject(TYPES.ICardListAvailableRepository)
        cardListAvailableRepository: ICardListAvailableRepository
    ) {
        this._repository = cardListAvailableRepository;
    }

    handle(query: Query<CardDOPBaseRequest<CardListAvailableDataReq>>) {
        return this._repository.cardListAvailable(query);
    }
}
