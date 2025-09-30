import { inject } from 'inversify';
import { TYPES } from '@/di/types/types';
import { Command } from '@/domain/models';
import { CardAvailableListDataReq } from '@/domain/entities/card/cardAvailableList';
import { ICardAvailableListRepository } from '@/domain/interfaces/card/card-available-list';

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
