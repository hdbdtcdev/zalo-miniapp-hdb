import { CardAvailableListDataRes } from "@/domain/entities/card/cardAvailableList";
import { StatusResponse } from "@/infrastructure/network";

export interface CardAvailableState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  responseStatus: StatusResponse | null;
  error: string | null;
  cardList: CardAvailableListDataRes[];
  cardActive: CardAvailableListDataRes | null;
}

export const initialCardAvailableState: CardAvailableState = {
  status: 'idle',
  responseStatus: null,
  error: null,
  cardList: [],
  cardActive: null,
};
