import { injectBaseConstantMethods } from "./base.constants";

export const BannerLinkType = {
    PRODUCT: "product",
    CATEGORY: "category",
    URL: "url",
    NONE: "none",
};

export const BANNER_LINK_TYPE_OPTIONS = [
    { value: "product", label: "Product" },
    { value: "category", label: "Category" },
    { value: "url", label: "URL" },
    { value: "none", label: "None (decorative)" },
];

const bannerLinkTypeTextKeys = {
    [BannerLinkType.PRODUCT]: "Product",
    [BannerLinkType.CATEGORY]: "Category",
    [BannerLinkType.URL]: "URL",
    [BannerLinkType.NONE]: "None",
};

const bannerLinkTypeLabelClasses = {
    [BannerLinkType.PRODUCT]: "bg-pulse-cream-dark text-pulse-green-dark",
    [BannerLinkType.CATEGORY]: "bg-pulse-cream-dark text-pulse-green-dark",
    [BannerLinkType.URL]: "bg-pulse-cream-dark text-pulse-green-dark",
    [BannerLinkType.NONE]: "bg-gray-100 text-gray-500",
};

export const BannerLinkTypeWithHelpers = injectBaseConstantMethods(
    BannerLinkType,
    bannerLinkTypeTextKeys,
    bannerLinkTypeLabelClasses,
);

export type BannerLinkTypeType =
    (typeof BannerLinkType)[keyof typeof BannerLinkType];
