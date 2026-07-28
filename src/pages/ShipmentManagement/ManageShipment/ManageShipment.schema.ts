import { z } from "zod";
import { formatDateToYearMonthDay } from "@/utils/dateTime.utils";

const optionSchema = z.object({ label: z.string(), value: z.string() });

const DATE_SCHEMA = z.preprocess(
    (value) => {
        if (value instanceof Date) {
            return formatDateToYearMonthDay(value);
        }
        return value;
    },
    z
        .string()
        .min(1, "Enter a date")

        .refine(
            (val) => {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(val)) return false;

                const [year, month, day] = val.split("-").map(Number);
                const isRepeating = /^(\d)\1{3}$/.test(String(year));
                if (isRepeating) return false;

                const date = new Date(val);
                if (
                    date.getFullYear() !== year ||
                    date.getMonth() + 1 !== month ||
                    date.getDate() !== day
                ) {
                    return false;
                }

                return true;
            },
            {
                message: "Enter a valid date",
            },
        )
        .refine(
            (val) => {
                const inputDate = new Date(val);
                const today = new Date();
                inputDate.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);
                return inputDate >= today;
            },
            {
                message: "Date cannot be in the past",
            },
        ),
);

export const ManageShipmentSchema = z.object({
    courier: z
        .string()
        .min(3, "Courier is required")
        .max(15, "Courier name must be between 3 to 15 characters"),
    shipmentMethod: z
        .union([z.string(), optionSchema, z.null(), z.undefined()])
        .transform((v) => {
            if (v === null || v === undefined) return "";
            return typeof v === "string" ? v : v.value;
        })
        .pipe(z.string().nonempty("Shipment method is required")),
    trackingNumber: z
        .string()
        .min(1, "Tracking number is required")
        .max(100, "Tracking number must be 100 characters or fewer"),

    estimatedDeliveryDate: DATE_SCHEMA,
    shippedDate: DATE_SCHEMA,
    notes: z
        .string()
        .max(500, "Notes must be 500 characters or fewer")
        .optional(),
});

export type ManageShipmentFormValues = z.infer<typeof ManageShipmentSchema>;

export const INITIAL_SHIPMENT_VALUES: ManageShipmentFormValues = {
    courier: "",
    shipmentMethod: "",
    trackingNumber: "",
    estimatedDeliveryDate: "",
    shippedDate: "",
    notes: "",
};
