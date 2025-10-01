const TYPES = {
    // Handler
    CvpCommonHandler: Symbol.for('CvpCommonHandler'),
    CardAvailableListHandler: Symbol.for('CardAvailableListHandler'),
    CardAvailableDetailHandler: Symbol.for('CardAvailableDetailHandler'),

    // Repository
    ICvpCommonRepository: Symbol.for('ICvpCommonRepository'),
    ICardAvailableListRepository: Symbol.for('ICardAvailableListRepository'),
    ICardAvailableDetailRepository: Symbol.for('ICardAvailableDetailRepository'),
};

export { TYPES };
