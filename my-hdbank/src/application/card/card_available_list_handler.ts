import { inject } from 'inversify';
import { TYPES } from '@/di/types/types';
import { ICardAvailableListRepository } from '@/domain/interfaces/card-available-list';
import { CardAvailableListDataReq } from '@/domain/entities/cardAvailableList';
import { Command } from '@/domain/models';

export class CardAvailableListHandler {
    private readonly _repository: ICardAvailableListRepository;

    constructor(
        @inject(TYPES.ICardAvailableListRepository)
        cardListAvailableRepository: ICardAvailableListRepository
    ) {
        this._repository = cardListAvailableRepository;
    }

    async handle(command: Command<CardAvailableListDataReq>) {
        return await this._repository.fetchAvailableCards(command);
    }
}
