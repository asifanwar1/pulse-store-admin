import { injectBaseConstantMethods } from "./base.constants";

export const OfferStatus = {
    UPCOMING: "UPCOMING",
    ACTIVE: "ACTIVE",
    EXPIRED: "EXPIRED",
    DISABLED: "DISABLED",
};

export const OFFER_STATUS_OPTIONS = [
    { value: "UPCOMING", label: "Upcoming" },
    { value: "ACTIVE", label: "Active" },
    { value: "EXPIRED", label: "Expired" },
    { value: "DISABLED", label: "Disabled" },
];

const offerStatusTextKeys = {
    [OfferStatus.UPCOMING]: "Upcoming",
    [OfferStatus.ACTIVE]: "Active",
    [OfferStatus.EXPIRED]: "Expired",
    [OfferStatus.DISABLED]: "Disabled",
};

const offerLabelClasses = {
    [OfferStatus.UPCOMING]: "bg-blue-100 text-blue-800",
    [OfferStatus.ACTIVE]: "bg-green-100 text-green-800",
    [OfferStatus.EXPIRED]: "bg-gray-200 text-gray-700",
    [OfferStatus.DISABLED]: "bg-red-100 text-red-800",
};

export const OfferStatusWithHelpers = injectBaseConstantMethods(
    OfferStatus,
    offerStatusTextKeys,
    offerLabelClasses,
);

export type OfferStatusType = (typeof OfferStatus)[keyof typeof OfferStatus];
