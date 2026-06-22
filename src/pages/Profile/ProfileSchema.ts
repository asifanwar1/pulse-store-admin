import { z } from "zod";

export const PROFILE_FORM_SCHEMA = z.object({
    fullName: z
        .string()
        .min(3, "Name is required")
        .max(20, "Name should be between 3 to 20 characters"),
    phone: z.string().min(1, "Phone is required"),
    street_address: z.string().min(1, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip Code is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
});

export type ProfileFormValues = z.infer<typeof PROFILE_FORM_SCHEMA>;
