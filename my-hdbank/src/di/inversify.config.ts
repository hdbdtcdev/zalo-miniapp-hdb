import { Container } from "inversify";
import { TYPES } from "./types/types";
import { CardAvailableListHandler } from "@/application/card/card_available_list_handler";
import { ICardAvailableListRepository } from "@/domain/interfaces/card-available-list";
import { CardAvailableListRepository } from "@/infrastructure/persistent/card/cardAvailableList.repository";
import { IAddressRepository } from "@/domain/interfaces/address";
import { AddressRepository } from "@/infrastructure/persistent/address/address.repository";
import { AddressHandler } from "@/application/address/address_handler";

const container = new Container();

container
  .bind<ICardAvailableListRepository>(TYPES.ICardAvailableListRepository)
  .to(CardAvailableListRepository);
container
  .bind<CardAvailableListHandler>(TYPES.CardAvailableListHandler)
  .to(CardAvailableListHandler);

container
  .bind<IAddressRepository>(TYPES.IAddressRepository)
  .to(AddressRepository);

container.bind<AddressHandler>(TYPES.AddressHandler).to(AddressHandler);

export { container };
