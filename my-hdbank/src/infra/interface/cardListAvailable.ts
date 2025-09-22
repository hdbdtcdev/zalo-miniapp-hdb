import { CardListAvailableDataRes } from "@/domain/entities/cardListAvailable";
import { CardDOPBaseResponse } from "@/domain/entities/common/cardDOPBaseApi";
import { Query } from "@/domain/model/query";

export interface ICardListAvailableRepository {
    cardListAvailable<TParameter>(request: Query<TParameter>): Promise<CardDOPBaseResponse<CardListAvailableDataRes[]>>;
}