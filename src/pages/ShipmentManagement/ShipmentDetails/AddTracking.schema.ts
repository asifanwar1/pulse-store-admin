import { z } from "zod";

const optionSchema = z.object({ label: z.string(), value: z.string() });

const optionalOptionField = z
    .union([z.string(), optionSchema, z.null(), z.undefined()])
    .transform((v) => {
        if (v === null || v === undefined) return "";
        return typeof v === "string" ? v : v.value;
    });

export const AddTrackingSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description must be 500 characters or fewer"),
    location: z
        .string()
        .max(200, "Location must be 200 characters or fewer")
        .optional(),
    status: optionalOptionField,
});

export type AddTrackingFormValues = z.infer<typeof AddTrackingSchema>;

export const INITIAL_TRACKING_VALUES: AddTrackingFormValues = {
    description: "",
    location: "",
    status: "",
};
