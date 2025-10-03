import { CardAvailableDetailDataRes } from "@/domain/entities/card/cardAvailableDetail";
import { Command } from "@/domain/models";
import { ApiResponse } from "@/infrastructure/network";

export interface ICardAvailableDetailRepository {
  fetchCardAvailableDetail<TParameter>(command: Command<TParameter>): Promise<ApiResponse<CardAvailableDetailDataRes[]>>;
}
