import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";


export interface ICardAvailableListRepository {
  fetchAvailableCards<TParameter>(command: Command<TParameter>): Promise<ApiResponse<CardAvailableListDataRes[]>>;
}
