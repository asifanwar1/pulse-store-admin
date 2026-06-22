import type { FieldType } from "@/components/custom/Form";
import type { ProfileFormValues } from "./ProfileSchema";

export const PROFILE_FORM_CONFIG: FieldType<ProfileFormValues>[] = [
    {
        name: "fullName",
        label: "Full Name",
        required: true,
        type: "text",
        placeholder: "Enter Full Name",
        className: "col-span-6",
    },
    {
        name: "phone",
        label: "Phone",
        required: true,
        type: "text",
        placeholder: "Enter Phone Number",
        className: "col-span-6",
    },
    {
        name: "street_address",
        label: "Street Address",
        required: true,
        type: "text",
        placeholder: "Enter Street Address",
        className: "col-span-6",
    },
    {
        name: "city",
        label: "City",
        required: true,
        type: "text",
        placeholder: "Enter City",
        className: "col-span-6",
    },
    {
        name: "zipCode",
        label: "Zip Code",
        required: true,
        type: "text",
        placeholder: "Enter Zip Code",
        className: "col-span-6",
    },
    {
        name: "state",
        label: "State",
        required: true,
        type: "text",
        placeholder: "Enter State",
        className: "col-span-6",
    },
    {
        name: "country",
        label: "Country",
        required: true,
        type: "text",
        placeholder: "Enter Country",
        className: "col-span-6",
    },
];
