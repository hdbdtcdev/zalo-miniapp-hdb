export interface CardListAvailableDataReq {
}

export interface CardListAvailableDataRes {
  productCode: string;
  productName: string;
  image: string;
  virtualCardSupported: boolean;
  debtAcctRequired: boolean;
  promoList: PromoList[];
  offerList: OfferList[];
  benefit: Benefit[];
  interestRate: InterestRate[];
}

export interface PromoList {
  icon: string;
  detail: string;
  title: string;
}

export interface OfferList {
  detail: string;
  title: string;
}

export interface Benefit {
  detail: string;
  title: string;
}

export interface InterestRate {
  detail: string;
  title: string;
}
