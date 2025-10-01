import { Container } from "inversify";
import { TYPES } from "./types/types";
import {
  ICardAvailableDetailRepository,
  ICardAvailableListRepository,
} from "@/domain/interfaces/card";
import {
  CardAvailableDetailRepository,
  CardAvailableListRepository,
  CvpCommonRepository,
} from "@/infrastructure/persistent";
import {
  CardAvailableDetailHandler,
  CardAvailableListHandler,
  CvpCommonHandler,
} from "@/application";
import { ICvpCommonRepository } from "@/domain/interfaces/cms";
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

container.bind<IUploadRepository>(TYPES.IUploadRepository).to(UploadRepository);
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
//#endregion

container
  .bind<ICardAvailableDetailRepository>(TYPES.ICardAvailableDetailRepository)
  .to(CardAvailableDetailRepository);
container
  .bind<CardAvailableDetailHandler>(TYPES.CardAvailableDetailHandler)
  .to(CardAvailableDetailHandler);

container
  .bind<ICvpCommonRepository>(TYPES.ICvpCommonRepository)
  .to(CvpCommonRepository);
container.bind<CvpCommonHandler>(TYPES.CvpCommonHandler).to(CvpCommonHandler);

export { container };
