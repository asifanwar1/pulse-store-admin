import { injectBaseConstantMethods } from "./base.constants";

export const OfferScope = {
    ALL_CATEGORIES: "ALL_CATEGORIES",
    SPECIFIC_CATEGORIES: "SPECIFIC_CATEGORIES",
};

export const OFFER_SCOPE_OPTIONS = [
    { value: "ALL_CATEGORIES", label: "All Categories" },
    { value: "SPECIFIC_CATEGORIES", label: "Specific Categories / Products" },
];

const offerScopeTextKeys = {
    [OfferScope.ALL_CATEGORIES]: "All Categories",
    [OfferScope.SPECIFIC_CATEGORIES]: "Specific Categories / Products",
};

const offerScopeLabelClasses = {
    [OfferScope.ALL_CATEGORIES]: "bg-pulse-cream-dark text-pulse-green-dark",
    [OfferScope.SPECIFIC_CATEGORIES]: "bg-pulse-cream-dark text-pulse-green-dark",
};

export const OfferScopeWithHelpers = injectBaseConstantMethods(
    OfferScope,
    offerScopeTextKeys,
    offerScopeLabelClasses,
);

export type OfferScopeType = (typeof OfferScope)[keyof typeof OfferScope];
