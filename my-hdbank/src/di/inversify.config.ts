import { Container } from 'inversify';
import { TYPES } from './types/types';
import { CardAvailableListHandler } from '@/application/card_available_list/card_available_list_handler';
import { CardAvailableListRepository } from '@/infrastructure/persistent/card/cardAvailableList.repository';
import { ICardAvailableDetailRepository } from '@/domain/interfaces/card/card-available-detail';
import { CvpCommonHandler } from '@/application/cvp_common/cvp_common_handler';
import { CvpCommonRepository } from '@/infrastructure/persistent/cvp_common/cvpCommon.repository';
import { CardAvailableDetailRepository } from '@/infrastructure/persistent/card/cardAvailableDetail.repository';
import { CardAvailableDetailHandler } from '@/application/card_available_detail/card_available_detail_handler';
import { ICardAvailableListRepository } from '@/domain/interfaces/card/card-available-list';
import { ICvpCommonRepository } from '@/domain/interfaces/cms/cvp_common';

const container = new Container();

container.bind<ICardAvailableListRepository>(TYPES.ICardAvailableListRepository).to(CardAvailableListRepository);
container.bind<CardAvailableListHandler>(TYPES.CardAvailableListHandler).to(CardAvailableListHandler);

container.bind<ICardAvailableDetailRepository>(TYPES.ICardAvailableDetailRepository).to(CardAvailableDetailRepository);
container.bind<CardAvailableDetailHandler>(TYPES.CardAvailableDetailHandler).to(CardAvailableDetailHandler);

container.bind<ICvpCommonRepository>(TYPES.ICvpCommonRepository).to(CvpCommonRepository);
container.bind<CvpCommonHandler>(TYPES.CvpCommonHandler).to(CvpCommonHandler);

export { container };
