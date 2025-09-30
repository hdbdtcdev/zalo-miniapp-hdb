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
import { DOPScanFrontHandler } from "@/application/dop/dop-scan-front-handler";
import { DOPLogNFCHandler } from "@/application/dop/dop-log-nfc-handler";
import { DOPScanLiveFaceHandler } from "@/application/dop/dop-scan-live-face";
import { DOPScanRearHandler } from "@/application/dop/dop-scan-rear-handler";

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

container
  .bind<DOPScanFrontHandler>(TYPES.DOPScanFrontHandler)
  .to(DOPScanFrontHandler);
container
  .bind<DOPScanRearHandler>(TYPES.DOPScanRearHandler)
  .to(DOPScanRearHandler);
container
  .bind<DOPScanLiveFaceHandler>(TYPES.DOPScanLiveFaceHandler)
  .to(DOPScanLiveFaceHandler);
container.bind<DOPLogNFCHandler>(TYPES.DOPLogNFCHandler).to(DOPLogNFCHandler);
container.bind<IUploadRepository>(TYPES.IUploadRepository).to(UploadRepository);
//#endregion

export { container };
