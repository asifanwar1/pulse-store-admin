import { Mail, Lock } from "lucide-react";
import type { FieldType } from "@/components/custom/Form";
import type {
    IForgotPasswordFormValues,
    ILoginFormValues,
    IResetPasswordFormValues,
} from "../types";

export const LOGIN_FORM_CONFIG: FieldType<ILoginFormValues>[] = [
    {
        name: "email",
        label: "Email",
        required: true,
        type: "text",
        placeholder: "Enter email address",
        icon: <Mail size={18} />,
    },
    {
        name: "password",
        label: "Password",
        required: true,
        type: "password",
        placeholder: "Enter password",
        icon: <Lock size={18} />,
    },
];

export const FORGOT_PASSWORD_FORM_CONFIG: FieldType<IForgotPasswordFormValues>[] =
    [
        {
            name: "email",
            label: "Email",
            required: true,
            type: "text",
            placeholder: "Enter email address",
            icon: <Mail size={18} />,
        },
    ];

export const RESET_PASSWORD_FORM_CONFIG: FieldType<IResetPasswordFormValues>[] =
    [
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            placeholder: "Enter password",
            icon: <Lock size={18} />,
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            required: true,
            placeholder: "Enter confirm password",
            icon: <Lock size={18} />,
        },
    ];

export const LOGIN_FORM_INITIAL_VALUES: ILoginFormValues = {
    email: "admin@dcd.com",
    password: "Click123$",
    type: "ADMIN",
    rememberToken: true,
};

export const FORGOT_PASSWORD_FORM_INITIAL_VALUES: IForgotPasswordFormValues = {
    email: "",
    type: "ADMIN",
};

export const RESET_PASSWORD_FORM_INITIAL_VALUES: IResetPasswordFormValues = {
    token: "",
    password: "",
    confirmPassword: "",
};
