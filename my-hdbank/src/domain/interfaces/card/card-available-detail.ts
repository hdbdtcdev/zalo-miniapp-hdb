import { CardAvailableDetailDataRes } from "@/domain/entities/card/cardAvailableDetail";
import { ApiResponse } from "@/infrastructure/network";
import { Command } from "../models";

export interface ICardAvailableDetailRepository {
  fetchCardAvailableDetail<TParameter>(command: Command<TParameter>): Promise<ApiResponse<CardAvailableDetailDataRes[]>>;
}
