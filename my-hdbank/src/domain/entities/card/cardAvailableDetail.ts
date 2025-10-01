
export interface CardAvailableDetailDataReq {
  productCode: string;
}

export interface CardAvailableDetailDataRes {
  productCode: string;
  productName: string;
  image: string;
  offerList: CardOfferList[]
  personalDataNotice: string;
  offerListDetail: CardOfferListDetail[]
  virtualCardSupported: boolean
  debtAcctRequired: boolean
  benefitImage: string;
  benefitProductName: string;
  poaLink: string;
}

export interface CardOfferList {
  icon: string;
  boldDetail: string;
  detail: string;
}

export interface CardOfferListDetail {
  icon: string;
  detail: string;
}
