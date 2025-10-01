import { CardAvailableDetailDataRes } from "@/domain/entities/card/cardAvailableDetail";
import { StatusResponse } from "@/infrastructure/network";

export interface CardAvailableDetailState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  responseStatus: StatusResponse | null;
  error: string | null;
  card: CardAvailableDetailDataRes | null;
}

export const initialCardAvailableDetailState: CardAvailableDetailState = {
  status: 'idle',
  responseStatus: null,
  error: null,
  card: null,
};
