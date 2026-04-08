import { z } from "zod";

const optionSchema = z.object({ label: z.string(), value: z.string() });

export const ManageOrderSchema = z.object({
    customerName: z
        .string()
        .min(1, "Customer name is required")
        .max(100, "Customer name must be 100 characters or fewer"),
    customerEmail: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    customerPhone: z
        .string()
        .min(7, "Phone number must be at least 7 digits")
        .max(20, "Phone number must be 20 characters or fewer"),
    paymentMethod: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Payment method is required")),
    shippingStreet: z
        .string()
        .min(1, "Street address is required")
        .max(200, "Street address must be 200 characters or fewer"),
    shippingCity: z
        .string()
        .min(1, "City is required")
        .max(100, "City must be 100 characters or fewer"),
    shippingState: z
        .string()
        .min(1, "State / Province is required")
        .max(100, "State must be 100 characters or fewer"),
    shippingZip: z
        .string()
        .min(1, "ZIP / Postal code is required")
        .max(20, "ZIP code must be 20 characters or fewer"),
    shippingCountry: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Country is required")),
    notes: z
        .string()
        .max(500, "Notes must be 500 characters or fewer")
        .optional(),
});

export type ManageOrderFormValues = z.infer<typeof ManageOrderSchema>;

export const INITIAL_ORDER_VALUES: ManageOrderFormValues = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    notes: "",
};
