import { z } from "zod";
import { BannerLinkType } from "@/constants/banner-link-type.constants";

const optionSchema = z.object({ label: z.any(), value: z.string() });

const unwrapOption = (value: unknown): string => {
    if (value === null || value === undefined) return "";
    return typeof value === "string"
        ? value
        : ((value as { value?: string }).value ?? "");
};

export const ManageBannerSchema = z
    .object({
        title: z
            .string()
            .min(1, "Title is required")
            .max(120, "Title must be 120 characters or fewer"),
        placement: z
            .union([z.string(), optionSchema, z.null(), z.undefined()])
            .transform(unwrapOption)
            .pipe(z.string().nonempty("Placement is required")),
        position: z
            .string()
            .optional()
            .default("0")
            .refine(
                (v) => v === undefined || v === "" || !isNaN(Number(v)),
                "Position must be a number",
            ),
        linkType: z
            .union([z.string(), optionSchema, z.null(), z.undefined()])
            .transform(unwrapOption)
            .pipe(
                z.enum(["product", "category", "url", "none"], {
                    error: "Link type is required",
                }),
            ),
        linkValue: z.string().optional().default(""),
        startDate: z.date().nullable().optional(),
        endDate: z.date().nullable().optional(),
        isActive: z.enum(["active", "inactive"]).default("active"),
    })
    .superRefine((data, ctx) => {
        if (
            data.startDate &&
            data.endDate &&
            data.endDate < data.startDate
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End date must be after start date",
                path: ["endDate"],
            });
        }

        if (
            data.linkType !== BannerLinkType.NONE &&
            !data.linkValue?.trim()
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Link value is required for this link type",
                path: ["linkValue"],
            });
        }
    });

export type ManageBannerFormValues = z.infer<typeof ManageBannerSchema>;

export const INITIAL_BANNER_VALUES: ManageBannerFormValues = {
    title: "",
    placement: "",
    position: "0",
    linkType: BannerLinkType.NONE as ManageBannerFormValues["linkType"],
    linkValue: "",
    startDate: null,
    endDate: null,
    isActive: "active",
};
