import { injectBaseConstantMethods } from "./base.constants";

export const BannerPlacement = {
    HOME_TOP: "home_top",
    HOME_MID: "home_mid",
    CATEGORY_PAGE: "category_page",
};

export const BANNER_PLACEMENT_OPTIONS = [
    { value: "home_top", label: "Home — Top" },
    { value: "home_mid", label: "Home — Middle" },
    { value: "category_page", label: "Category Page" },
];

const bannerPlacementTextKeys = {
    [BannerPlacement.HOME_TOP]: "Home — Top",
    [BannerPlacement.HOME_MID]: "Home — Middle",
    [BannerPlacement.CATEGORY_PAGE]: "Category Page",
};

const bannerPlacementLabelClasses = {
    [BannerPlacement.HOME_TOP]: "bg-pulse-cream-dark text-pulse-green-dark",
    [BannerPlacement.HOME_MID]: "bg-pulse-cream-dark text-pulse-green-dark",
    [BannerPlacement.CATEGORY_PAGE]:
        "bg-pulse-cream-dark text-pulse-green-dark",
};

export const BannerPlacementWithHelpers = injectBaseConstantMethods(
    BannerPlacement,
    bannerPlacementTextKeys,
    bannerPlacementLabelClasses,
);

export type BannerPlacementType =
    (typeof BannerPlacement)[keyof typeof BannerPlacement];
