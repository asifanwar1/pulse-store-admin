export const ManageProductSchema = z.object({
    name: z
        .string()
        .min(1, "Product name is required")
        .max(120, "Product name must be 120 characters or fewer"),
    sku: z
        .string()
        .min(1, "SKU is required")
        .max(60, "SKU must be 60 characters or fewer"),
    brand: z
        .string()
        .min(1, "Brand is required")
        .max(80, "Brand must be 80 characters or fewer"),
    category: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Category is required")),
    status: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Status is required")),
    price: z
        .string()
        .min(1, "Price is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
            message: "Price must be a positive number",
        }),

    costPrice: z
        .string()
        .min(1, "Cost price is required")
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
            message: "Cost price must be a positive number",
        }),

    stock: z
        .string()
        .min(1, "Stock quantity is required")
        .refine((v) => !isNaN(Number(v)) && Number(parseInt(v, 10)) >= 0, {
            message: "Stock must be a non-negative whole number",
        }),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be between 10 and 500 characters"),
    tags: z.array(z.string()).optional(),
    images: z
        .array(z.custom<File>((val) => val instanceof File, "Must be a file"))
        .min(1, "At least one image is required")
        .default([]),
});

export type ManageProductFormValues = z.infer<typeof ManageProductSchema>;

export const INITIAL_PRODUCT_VALUES: ManageProductFormValues = {
    name: "",
    sku: "",
    brand: "",
    category: "",
    status: "",
    price: "",
    costPrice: "",
    stock: "",
    description: "",
    tags: [],
    images: [],
};
