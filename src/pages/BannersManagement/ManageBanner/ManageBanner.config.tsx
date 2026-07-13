import type { UseFormReturn } from "react-hook-form";

import { Select } from "@/components/custom/Select";
import { DatePicker } from "@/components/custom/DatePicker";
import CustomToggle from "@/components/custom/CustomToggle/CustomToggle";
import { type FieldType } from "@/components/custom/Form";
import { BANNER_PLACEMENT_OPTIONS } from "@/constants/banner-placement.constants";
import {
    BANNER_LINK_TYPE_OPTIONS,
    BannerLinkType,
} from "@/constants/banner-link-type.constants";
import type { ManageBannerFormValues } from "./ManageBanner.schema";

const resolveLinkType = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    return typeof value === "string"
        ? value
        : ((value as { value?: string }).value ?? "");
};

const isLinkValueVisible = (
    form: UseFormReturn<ManageBannerFormValues>,
) => {
    const linkType = resolveLinkType(form.watch("linkType"));
    return linkType !== "" && linkType !== BannerLinkType.NONE;
};

export const getManageBannerFormConfig = (): FieldType<ManageBannerFormValues>[] => [
    {
        name: "title",
        label: "Banner Title",
        type: "text",
        placeholder: "e.g. Summer Sale Hero",
        required: true,
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        helperText: "Internal label only — customers never see this.",
    },
    {
        name: "placement",
        label: "Placement",
        component: Select,
        placeholder: "Select a placement",
        required: true,
        className: "col-span-12 md:col-span-4",
        componentProps: {
            options: BANNER_PLACEMENT_OPTIONS,
            labelClass: "font-normal",
        },
    },
    {
        name: "position",
        label: "Position",
        type: "number",
        placeholder: "0",
        className: "col-span-12 md:col-span-2",
        labelClass: "font-normal",
        helperText: "Ascending sort order within this placement.",
    },
    {
        name: "linkType",
        label: "Link Type",
        component: Select,
        placeholder: "Select link type",
        required: true,
        className: "col-span-12 md:col-span-6",
        componentProps: {
            options: BANNER_LINK_TYPE_OPTIONS,
            labelClass: "font-normal",
        },
    },
    {
        name: "linkValue",
        label: "Link Value",
        type: "text",
        placeholder: "Product ID, Category ID, or URL",
        className: "col-span-12 md:col-span-6",
        labelClass: "font-normal",
        shouldDisplay: isLinkValueVisible,
        helperText:
            "Depends on Link Type above — a product ID, category ID, or a full URL.",
    },
    {
        name: "startDate",
        label: "Start Date",
        component: DatePicker,
        className: "col-span-12 md:col-span-4",
        labelClass: "font-normal",
        componentProps: { showIcon: true },
        helperText: "Leave blank to activate immediately.",
    },
    {
        name: "endDate",
        label: "End Date",
        component: DatePicker,
        className: "col-span-12 md:col-span-4",
        labelClass: "font-normal",
        componentProps: { showIcon: true },
        helperText: "Leave blank for no expiry.",
    },
    {
        name: "isActive",
        label: "Status",
        component: CustomToggle,
        className: "col-span-12 md:col-span-4",
        componentProps: {
            isLabel: true,
            onLabel: "Active",
            offLabel: "Inactive",
            offLabelClass: "mr-[0rem]",
            onCircleClass: "ml-[-1rem]",
        },
    },
];
