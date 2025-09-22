import { Container } from 'inversify';
import { TYPES } from './types/types';
import { CardListAvailableRepository } from '@/infra/card/cardListAvailable.repository';
import { ICardListAvailableRepository } from '@/infra/interface/cardListAvailable';
import { CardListAvailableHandler } from '@/application/card/cardListAvailable_handler';

const container = new Container();


container.bind<ICardListAvailableRepository>(TYPES.ICardListAvailableRepository).to(CardListAvailableRepository);
container.bind<CardListAvailableHandler>(TYPES.CardListAvailableHandler).to(CardListAvailableHandler);


export { container };
