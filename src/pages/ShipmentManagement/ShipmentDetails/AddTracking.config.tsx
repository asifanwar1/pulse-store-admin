import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { type FieldType } from "@/components/custom/Form";
import { SHIPMENT_STATUS_OPTIONS } from "@/constants/shipment-status.constants";
import { type AddTrackingFormValues } from "./AddTracking.schema";

export const ADD_TRACKING_FORM_CONFIG: FieldType<AddTrackingFormValues>[] = [
    {
        name: "description",
        label: "Description",
        component: TextareaInput,
        placeholder: "e.g. Arrived at Lahore hub",
        required: true,
        className: "col-span-12",
        componentProps: {
            rows: 3,
            maxLength: 500,
            showCharacterCount: true,
        },
    },
    {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "e.g. Lahore, PK",
        className: "col-span-12",
        labelClass: "font-normal",
    },
    {
        name: "status",
        label: "Status",
        component: Select,
        placeholder: "Leave blank to only log a note",
        className: "col-span-12",
        helperText:
            "Choosing a status moves this shipment (and its order) to that status. Leave blank to just add a note.",
        componentProps: {
            options: SHIPMENT_STATUS_OPTIONS,
            labelClass: "font-normal",
        },
    },
];
