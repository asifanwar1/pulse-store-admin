import type { FieldType } from "@/components/custom/Form";
import type { SettingsFormValues } from "./Settings.schema";

export const SETTINGS_FORM_CONFIG: FieldType<SettingsFormValues>[] = [
    {
        name: "shippingFee",
        label: "Shipping Fee",
        required: true,
        type: "number",
        placeholder: "Enter shipping fee",
        className: "col-span-12 sm:col-span-4",
        componentProps: { step: "0.01", min: "0" },
        helperText: "Applied to every new order at checkout.",
    },
];
