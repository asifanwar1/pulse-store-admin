import { z } from "zod";

export const SETTINGS_FORM_SCHEMA = z.object({
    shippingFee: z
        .string()
        .min(1, "Shipping fee is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
            message: "Shipping fee must be a non-negative number",
        }),
});

export type SettingsFormValues = z.infer<typeof SETTINGS_FORM_SCHEMA>;
