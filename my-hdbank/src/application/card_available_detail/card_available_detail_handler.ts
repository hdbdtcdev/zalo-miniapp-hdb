import { inject } from 'inversify';
import { TYPES } from '@/di/types/types';
import { Command } from '@/domain/models';
import { CardAvailableDetailDataReq } from '@/domain/entities/card/cardAvailableDetail';
import { ICardAvailableDetailRepository } from '@/domain/interfaces/card/card-available-detail';

export class CardAvailableDetailHandler {
    private readonly _repository: ICardAvailableDetailRepository;

    constructor(
        @inject(TYPES.ICardAvailableDetailRepository)
        cardDetailAvailableRepository: ICardAvailableDetailRepository
    ) {
        this._repository = cardDetailAvailableRepository;
    }

    async handle(command: Command<CardAvailableDetailDataReq>) {
        return await this._repository.fetchCardAvailableDetail(command);
    }
}
