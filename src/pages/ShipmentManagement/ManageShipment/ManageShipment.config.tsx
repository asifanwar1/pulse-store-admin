import { Select } from "@/components/custom/Select";
import TextareaInput from "@/components/custom/Inputs/TextareaInput/TextareaInput";
import { type FieldType } from "@/components/custom/Form";
import { type ManageShipmentFormValues } from "./ManageShipment.schema";
import { DatePicker } from "@/components/custom/DatePicker";
import { SHIPMENT_METHODS_OPTIONS } from "@/constants/shipment-methods";

export const MANAGE_SHIPMENT_FORM_CONFIG: FieldType<ManageShipmentFormValues>[] =
    [
        {
            name: "courier",
            label: "Courier Service",
            type: "text",
            placeholder: "e.g. FedX",
            required: true,
            className: "col-span-12 md:col-span-6",
            labelClass: "font-normal",
        },

        {
            name: "shipmentMethod",
            label: "Shipment Method",
            component: Select,
            placeholder: "Select carrier",
            required: true,
            className: "col-span-12 md:col-span-6",
            componentProps: {
                options: SHIPMENT_METHODS_OPTIONS,
                labelRequired: true,
                labelClass: "font-normal",
            },
        },
        {
            name: "trackingNumber",
            label: "Tracking Number",
            type: "text",
            placeholder: "e.g. 1Z999AA10123456790",
            required: true,
            className: "col-span-12 md:col-span-6",
            labelClass: "font-normal",
        },
        {
            name: "shippedDate",
            label: "Shipped Date",
            type: "text",
            component: DatePicker,
            componentProps: {
                showIcon: true,
            },
            placeholder: "e.g. MM/DD/YYYY",
            required: true,
            className: "col-span-12 md:col-span-6",
            labelClass: "font-normal",
        },
        {
            name: "estimatedDeliveryDate",
            label: "Estimated Delivery Date",
            type: "text",
            component: DatePicker,
            componentProps: {
                showIcon: true,
            },
            placeholder: "e.g. MM/DD/YYYY",
            required: true,
            className: "col-span-12 md:col-span-6",
            labelClass: "font-normal",
        },
        {
            name: "notes",
            label: "Shipment Notes",
            component: TextareaInput,
            placeholder: "Any special handling instructions or notes…",
            required: false,
            className: "col-span-12",
            componentProps: {
                rows: 3,
                maxLength: 500,
                showCharacterCount: true,
            },
        },
    ];
