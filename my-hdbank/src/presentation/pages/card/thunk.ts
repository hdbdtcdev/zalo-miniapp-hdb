import { createAsyncThunk } from '@reduxjs/toolkit';
import { CardListAvailableDataReq } from '@/domain/entities/cardListAvailable';
import { CardListAvailableHandler } from '@/application/card/cardListAvailable_handler';
import { container } from '@/di/inversify.config';
import { CardDOPBaseRequest } from '@/domain/entities/common/cardDOPBaseApi';
import { TYPES } from '@/di/types/types';
import { Query } from '@/domain/models/query';
import { commonService } from '@/infra/network/networkService';

export const fetchCardListAvailable = createAsyncThunk('cardListAvailable/fetch', async (payload: CardDOPBaseRequest<CardListAvailableDataReq>['data']) => {
    const cardListAvailable = container.get<CardListAvailableHandler>(TYPES.CardListAvailableHandler);
    const payloadReq = commonService.getPayload<CardDOPBaseRequest<CardListAvailableDataReq>, CardDOPBaseRequest<CardListAvailableDataReq>['data']>({ data: payload })
    const query = new Query<CardDOPBaseRequest<CardListAvailableDataReq>>({
        query: {
            ...payloadReq,
            screenName: "MFE-DOP-HomeScreen",
        },
    });
    return await cardListAvailable.handle(query);
});
