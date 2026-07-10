import { injectBaseConstantMethods } from "./base.constants";

export const ReviewVisibility = {
    VISIBLE: "VISIBLE",
    HIDDEN: "HIDDEN",
};

export const REVIEW_VISIBILITY_OPTIONS = [
    { value: "VISIBLE", label: "Visible" },
    { value: "HIDDEN", label: "Hidden" },
];

const reviewVisibilityTextKeys = {
    [ReviewVisibility.VISIBLE]: "Visible",
    [ReviewVisibility.HIDDEN]: "Hidden",
};

const reviewVisibilityLabelClasses = {
    [ReviewVisibility.VISIBLE]: "bg-green-100 text-green-800",
    [ReviewVisibility.HIDDEN]: "bg-gray-200 text-gray-700",
};

export const ReviewVisibilityWithHelpers = injectBaseConstantMethods(
    ReviewVisibility,
    reviewVisibilityTextKeys,
    reviewVisibilityLabelClasses,
);

export type ReviewVisibilityType =
    (typeof ReviewVisibility)[keyof typeof ReviewVisibility];
