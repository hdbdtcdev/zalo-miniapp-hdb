import { Container } from "inversify";
import { TYPES } from "./types/types";
import { CardAvailableListHandler } from "@/application/card/card_available_list_handler";
import { ICardAvailableListRepository } from "@/domain/interfaces/card-available-list";
import { CardAvailableListRepository } from "@/infrastructure/persistent/card/cardAvailableList.repository";
import { IDOPRepository } from "@/domain/interfaces";
import { DOPRepository } from "@/infrastructure/persistent/dop/dop.repository";
import { DOPGetAuthHandler } from "@/application/dop/dop-get-auth-handler";
import { IUploadRepository } from "@/domain/interfaces/upload-repository";
import { UploadRepository } from "@/infrastructure/persistent/dop/upload.repository";

const container = new Container();

container
  .bind<ICardAvailableListRepository>(TYPES.ICardAvailableListRepository)
  .to(CardAvailableListRepository);
container
  .bind<CardAvailableListHandler>(TYPES.CardAvailableListHandler)
  .to(CardAvailableListHandler);

//#region DOP
container.bind<IDOPRepository>(TYPES.IDOPRepository).to(DOPRepository);
container
  .bind<DOPGetAuthHandler>(TYPES.DOPGetAuthHandler)
  .to(DOPGetAuthHandler);

container.bind<IUploadRepository>(TYPES.IUploadRepository).to(UploadRepository);
//#endregion

export { container };
