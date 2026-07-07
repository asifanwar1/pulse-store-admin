import { z } from "zod";
import { OfferScope } from "@/constants/offer-scope.constants";

const optionSchema = z.object({ label: z.any(), value: z.string() });

export const ManageOfferSchema = z
    .object({
        name: z
            .string()
            .min(1, "Offer name is required")
            .max(120, "Offer name must be 120 characters or fewer"),
        description: z
            .string()
            .max(500, "Description must be 500 characters or fewer")
            .optional(),
        discountPercentage: z
            .string()
            .min(1, "Discount percentage is required")
            .refine(
                (v) => !isNaN(Number(v)) && Number(v) > 0 && Number(v) <= 100,
                { message: "Discount must be between 0 and 100" },
            ),
        scope: z
            .union([z.string(), optionSchema, z.null(), z.undefined()])
            .transform((v) => {
                if (v === null || v === undefined) return "";
                return typeof v === "string" ? v : v.value;
            })
            .pipe(z.string().nonempty("Scope is required")),
        categoryIds: z.array(optionSchema).optional().default([]),
        includedProductIds: z.array(optionSchema).optional().default([]),
        excludedProductIds: z.array(optionSchema).optional().default([]),
        startDate: z.date({ error: "Start date is required" }),
        endDate: z.date({ error: "End date is required" }),
        isActive: z.boolean().default(true),
    })
    .superRefine((data, ctx) => {
        if (data.endDate <= data.startDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "End date must be after start date",
                path: ["endDate"],
            });
        }

        if (
            data.scope === OfferScope.SPECIFIC_CATEGORIES &&
            data.categoryIds.length === 0 &&
            data.includedProductIds.length === 0
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Select at least one category or product for this offer",
                path: ["categoryIds"],
            });
        }

        const includedIds = new Set(
            data.includedProductIds.map((option) => option.value),
        );
        const overlaps = data.excludedProductIds.some((option) =>
            includedIds.has(option.value),
        );
        if (overlaps) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "A product cannot be both included and excluded",
                path: ["excludedProductIds"],
            });
        }
    });

export type ManageOfferFormValues = z.infer<typeof ManageOfferSchema>;

export const INITIAL_OFFER_VALUES: ManageOfferFormValues = {
    name: "",
    description: "",
    discountPercentage: "",
    scope: "",
    categoryIds: [],
    includedProductIds: [],
    excludedProductIds: [],
    startDate: undefined as unknown as Date,
    endDate: undefined as unknown as Date,
    isActive: true,
};
