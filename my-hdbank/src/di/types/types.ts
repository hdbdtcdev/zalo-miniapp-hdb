const TYPES = {
  // Handler
  CvpCommonHandler: Symbol.for("CvpCommonHandler"),
  CardAvailableListHandler: Symbol.for("CardAvailableListHandler"),
  CardAvailableDetailHandler: Symbol.for("CardAvailableDetailHandler"),

  DOPGetAuthHandler: Symbol.for("DOPGetAuthHandler"),
  DOPScanFrontHandler: Symbol.for("DOPScanFrontHandler"),
  DOPScanRearHandler: Symbol.for("DOPScanRearHandler"),
  DOPScanLiveFaceHandler: Symbol.for("DOPScanLiveFaceHandler"),
  DOPLogNFCHandler: Symbol.for("DOPLogNFCHandler"),

  // Repository
  ICvpCommonRepository: Symbol.for("ICvpCommonRepository"),
  ICardAvailableListRepository: Symbol.for("ICardAvailableListRepository"),
  ICardAvailableDetailRepository: Symbol.for("ICardAvailableDetailRepository"),
  IDOPRepository: Symbol.for("IDOPRepository"),
  IUploadRepository: Symbol.for("IUploadRepository"),
};

export { TYPES };
