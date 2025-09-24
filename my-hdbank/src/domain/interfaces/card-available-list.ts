import { CardAvailableListDataRes } from "@/domain/entities/cardAvailableList";
import { ApiResponse } from "@/infrastructure/network";
import { Command } from "../models";

export interface ICardAvailableListRepository {
  fetchAvailableCards<TParameter>(command: Command<TParameter>): Promise<ApiResponse<CardAvailableListDataRes[]>>;
}
