import { z } from "zod";

const optionSchema = z.object({ label: z.string(), value: z.string() });

const productSchema = z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().min(1),
});

export const ManageOrderSchema = z.object({
    customer: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            if (typeof v === "string") return v;
            if (v && typeof v === "object" && "value" in v) {
                return (v as z.infer<typeof optionSchema>).value;
            }
            return "";
        })
        .refine((v) => v.length > 0, "Customer is required"),
    products: z
        .array(productSchema)
        .nonempty("At least one product is required"),

    paymentMethod: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Payment method is required")),

    notes: z
        .string()
        .max(500, "Notes must be 500 characters or fewer")
        .optional(),
});

export type ManageOrderFormValues = z.infer<typeof ManageOrderSchema>;

export const INITIAL_ORDER_VALUES: ManageOrderFormValues = {
    customer: "",
    products: [],
    paymentMethod: "",
    notes: "",
};
