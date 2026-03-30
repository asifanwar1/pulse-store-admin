import mailIcon from "@/assets/icons/mail-icon.svg";
import keyIcon from "@/assets/icons/key-icon.svg";
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
        type: "text",
        placeholder: "Enter email address",
        icon: <img src={mailIcon} alt="mail" />,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        icon: <img src={keyIcon} alt="key" />,
    },
];

export const FORGOT_PASSWORD_FORM_CONFIG: FieldType<IForgotPasswordFormValues>[] =
    [
        {
            name: "email",
            label: "Email",
            type: "text",
            placeholder: "Enter email address",
            icon: <img src={mailIcon} alt="mail" />,
        },
    ];

export const RESET_PASSWORD_FORM_CONFIG: FieldType<IResetPasswordFormValues>[] =
    [
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            icon: <img src={keyIcon} alt="key" />,
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Enter confirm password",
            icon: <img src={keyIcon} alt="key" />,
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
