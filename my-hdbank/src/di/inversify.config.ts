import { Container } from 'inversify';
import { TYPES } from './types/types';
import {
  ICardAvailableDetailRepository,
  ICardAvailableListRepository
} from '@/domain/interfaces/card';
import {
  CardAvailableDetailRepository,
  CardAvailableListRepository,
  CvpCommonRepository
} from '@/infrastructure/persistent';
import {
  CardAvailableDetailHandler,
  CardAvailableListHandler,
  CvpCommonHandler
} from '@/application';
import {
  ICvpCommonRepository
} from '@/domain/interfaces/cms';

const container = new Container();

container.bind<ICardAvailableListRepository>(TYPES.ICardAvailableListRepository).to(CardAvailableListRepository);
container.bind<CardAvailableListHandler>(TYPES.CardAvailableListHandler).to(CardAvailableListHandler);

container.bind<ICardAvailableDetailRepository>(TYPES.ICardAvailableDetailRepository).to(CardAvailableDetailRepository);
container.bind<CardAvailableDetailHandler>(TYPES.CardAvailableDetailHandler).to(CardAvailableDetailHandler);

container.bind<ICvpCommonRepository>(TYPES.ICvpCommonRepository).to(CvpCommonRepository);
container.bind<CvpCommonHandler>(TYPES.CvpCommonHandler).to(CvpCommonHandler);

export { container };
