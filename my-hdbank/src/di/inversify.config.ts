import { Container } from 'inversify';
import { TYPES } from './types/types';
import { CardAvailableListHandler } from '@/application/card/card_available_list_handler';
import { ICardAvailableListRepository } from '@/domain/interfaces/card-available-list';
import { CardAvailableListRepository } from '@/infrastructure/persistent/card/cardAvailableList.repository';

const container = new Container();

container.bind<ICardAvailableListRepository>(TYPES.ICardAvailableListRepository).to(CardAvailableListRepository);
container.bind<CardAvailableListHandler>(TYPES.CardAvailableListHandler).to(CardAvailableListHandler);

export { container };
