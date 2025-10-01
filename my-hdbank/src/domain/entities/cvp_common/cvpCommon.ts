export interface CvpCommonDataReq { 
    locale: string;
    populate: string;
    domainCode: string;
    cvpTitle: string;
    isActive: boolean;
}

export interface CvpCommonDataRes {
    id: number;
    attributes: CvpCommonAttributes;
}

export interface CvpCommonAttributes {
    cvp_title: string;
    domain_code: string;
    cvp_deeplink: string;
    description: string | null;
    cvp_background_video: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    cvp_promotion: CvpPromotion;
    cvp_usp: CvpUsp;
    cvp_feature: CvpFeature;
    cvp_faq: CvpFaq;
    tnc_common: TncCommon;
    cvp_cta_button: CvpCtaButton;
    share_deep_link_url?: string;
    tnc_text?: string;
}

export interface CvpPromotion {
    data: {
        id: number;
        attributes: CvpPromotionAttributes;
    };
}

export interface CvpPromotionAttributes {
    title: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    order: number;
    cvp_promotion_card: CvpPromotionCard[];
    localizations: Localizations;
}

export interface CvpPromotionCard {
    id: number;
    order: number;
    title: string | null;
    description: string | null;
    label_font: string | null;
    label_color: string | null;
    background_color: string | null;
    banner_start_date: string;
    banner_end_date: string;
    is_active: boolean;
    navigation_type: string;
    destination: string | null;
    banner_image_url: string;
}

export interface CvpUsp {
    data: {
        id: number;
        attributes: CvpUspAttributes;
    };
}

export interface CvpUspAttributes {
    title: string;
    background_color: string | null;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    cvp_usp_item: CvpUspItem[];
    localizations: Localizations;
}

export interface CvpUspItem {
    id: number;
    order: number;
    label: string;
    label_font: string | null;
    label_color: string | null;
    icon_url: string | null;
    navigation_type: string | null;
    destination: string | null;
    is_active: boolean | null;
    tracking_id: string | null;
}

export interface CvpFeature {
    data: {
        id: number;
        attributes: CvpFeatureAttributes;
    };
}

export interface CvpFeatureAttributes {
    title: string;
    order: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    cvp_feature_item: CvpFeatureItem[];
    localizations: Localizations;
}

export interface CvpFeatureItem {
    id: number;
    order: number;
    label: string;
    label_font: string | null;
    label_color: string | null;
    is_active: boolean;
    icon_url: string;
}

export interface CvpFaq {
    data: {
        id: number;
        attributes: CvpFaqAttributes;
    };
}

export interface CvpFaqAttributes {
    title: string;
    order: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    cvp_faq_item: CvpFaqItem[];
    localizations: Localizations;
}

export interface CvpFaqItem {
    id: number;
    order: number | null;
    title: string;
    content: string;
    is_active: boolean;
    content_type: string | null;
    icon_url: string;
}

export interface TncCommon {
    data: {
        id: number;
        attributes: TncCommonAttributes;
    };
}

export interface TncCommonAttributes {
    tnc_name: string;
    title: string;
    content: string | null;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    tnc_text: string;
    highlight: string;
    pdf_url: string;
}

export interface CvpCtaButton {
    id: number;
    label: string;
    label_color: string | null;
    background_color: BackgroundColor[];
    is_active: boolean;
}

export interface BackgroundColor {
    color: string;
    offset: string;
    opacity: string;
}

export interface Localizations {
    data: [];
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}
