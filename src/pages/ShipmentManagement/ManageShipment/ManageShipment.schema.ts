import { z } from "zod";

const optionSchema = z.object({ label: z.string(), value: z.string() });

export const ManageShipmentSchema = z.object({
    orderId: z
        .string()
        .min(1, "Order ID is required")
        .max(50, "Order ID must be 50 characters or fewer"),
    customerName: z
        .string()
        .min(1, "Customer name is required")
        .max(100, "Customer name must be 100 characters or fewer"),
    customerEmail: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    carrier: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Carrier is required")),
    trackingNumber: z
        .string()
        .min(1, "Tracking number is required")
        .max(100, "Tracking number must be 100 characters or fewer"),
    weight: z
        .union([z.string(), z.number()])
        .transform((v) => (typeof v === "string" ? parseFloat(v) || 0 : v))
        .pipe(z.number().min(0.01, "Weight must be greater than 0")),
    originStreet: z
        .string()
        .min(1, "Origin street address is required")
        .max(200, "Street address must be 200 characters or fewer"),
    originCity: z
        .string()
        .min(1, "Origin city is required")
        .max(100, "City must be 100 characters or fewer"),
    originState: z
        .string()
        .min(1, "Origin state is required")
        .max(100, "State must be 100 characters or fewer"),
    originZip: z
        .string()
        .min(1, "Origin ZIP code is required")
        .max(20, "ZIP code must be 20 characters or fewer"),
    originCountry: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Origin country is required")),
    destinationStreet: z
        .string()
        .min(1, "Destination street address is required")
        .max(200, "Street address must be 200 characters or fewer"),
    destinationCity: z
        .string()
        .min(1, "Destination city is required")
        .max(100, "City must be 100 characters or fewer"),
    destinationState: z
        .string()
        .min(1, "Destination state is required")
        .max(100, "State must be 100 characters or fewer"),
    destinationZip: z
        .string()
        .min(1, "Destination ZIP code is required")
        .max(20, "ZIP code must be 20 characters or fewer"),
    destinationCountry: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Destination country is required")),
    notes: z
        .string()
        .max(500, "Notes must be 500 characters or fewer")
        .optional(),
});

export type ManageShipmentFormValues = z.infer<typeof ManageShipmentSchema>;

export const INITIAL_SHIPMENT_VALUES: ManageShipmentFormValues = {
    orderId: "",
    customerName: "",
    customerEmail: "",
    carrier: "",
    trackingNumber: "",
    weight: 0,
    originStreet: "",
    originCity: "",
    originState: "",
    originZip: "",
    originCountry: "",
    destinationStreet: "",
    destinationCity: "",
    destinationState: "",
    destinationZip: "",
    destinationCountry: "",
    notes: "",
};
