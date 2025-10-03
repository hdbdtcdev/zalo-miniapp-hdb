const TYPES = {
  ICardAvailableListRepository: Symbol.for("ICardAvailableListRepository"),
  CardAvailableListHandler: Symbol.for("CardAvailableListHandler"),
  IAddressRepository: Symbol.for("IAddressRepository"),
  AddressHandler: Symbol.for("AddressHandler"),
  IJobRepository: Symbol.for("IJobRepository"),
  JobHandler: Symbol.for("JobHandler"),
  // Handler
  CvpCommonHandler: Symbol.for("CvpCommonHandler"),
  CardAvailableDetailHandler: Symbol.for("CardAvailableDetailHandler"),
  DOPGetAuthHandler: Symbol.for("DOPGetAuthHandler"),
  DOPScanFrontHandler: Symbol.for("DOPScanFrontHandler"),
  DOPScanRearHandler: Symbol.for("DOPScanRearHandler"),
  DOPScanLiveFaceHandler: Symbol.for("DOPScanLiveFaceHandler"),
  DOPLogNFCHandler: Symbol.for("DOPLogNFCHandler"),
  ValideOcrHandler: Symbol.for("ValideOcrHandler"),

  // Repository
  ICvpCommonRepository: Symbol.for("ICvpCommonRepository"),
  ICardAvailableDetailRepository: Symbol.for("ICardAvailableDetailRepository"),
  IDOPRepository: Symbol.for("IDOPRepository"),
  IUploadRepository: Symbol.for("IUploadRepository"),
  IValidateOcrRepository: Symbol.for("IValidateOcrRepository"),
};

export { TYPES };
