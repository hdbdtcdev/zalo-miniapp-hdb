const TYPES = {
  ICardAvailableListRepository: Symbol.for("ICardAvailableListRepository"),
  CardAvailableListHandler: Symbol.for("CardAvailableListHandler"),
  IDOPRepository: Symbol.for("IDOPRepository"),
  IUploadRepository: Symbol.for("IUploadRepository"),

  DOPGetAuthHandler: Symbol.for("DOPGetAuthHandler"),
  DOPScanFrontHandler: Symbol.for("DOPScanFrontHandler"),
  DOPScanRearHandler: Symbol.for("DOPScanRearHandler"),
  DOPScanLiveFaceHandler: Symbol.for("DOPScanLiveFaceHandler"),
  DOPLogNFCHandler: Symbol.for("DOPLogNFCHandler"),
};

export { TYPES };
