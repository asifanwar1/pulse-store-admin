import mailIcon from "@/assets/icons/mail-icon.svg";
import keyIcon from "@/assets/icons/key-icon.svg";
import { cn } from "@/lib/utils";
import type { TFormFieldConfig } from "@/components/shared/FormBuilder/FormBuilder";
import type {
    IForgotPasswordFormValues,
    ILoginFormValues,
    IResetPasswordFormValues
} from "../types";

const BASE_INPUT_STYLES = cn(
    "my-1 h-12 pl-11 border border-muted rounded-md",
    "text-black placeholder:text-muted font-medium text-16",
    "focus:border-muted focus:ring-2 focus:ring-muted/20 focus:outline-none"
);

const INPUT_WITH_ICON = cn(BASE_INPUT_STYLES, "pr-4 w-full");

export const LOGIN_FORM_CONFIG: TFormFieldConfig<ILoginFormValues>[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email address",
        inputClassName: INPUT_WITH_ICON,
        icon: <img src={mailIcon} alt="mail" />
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        inputClassName: INPUT_WITH_ICON,
        icon: <img src={keyIcon} alt="key" />
    }
];

export const FORGOT_PASSWORD_FORM_CONFIG: TFormFieldConfig<IForgotPasswordFormValues>[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: "Enter email address",
        inputClassName: INPUT_WITH_ICON,
        icon: <img src={mailIcon} alt="mail" />
    }
];

export const RESET_PASSWORD_FORM_CONFIG: TFormFieldConfig<IResetPasswordFormValues>[] = [
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        inputClassName: INPUT_WITH_ICON,
        icon: <img src={keyIcon} alt="key" />
    },
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Enter confirm password",
        inputClassName: INPUT_WITH_ICON,
        icon: <img src={keyIcon} alt="key" />
    }
];

export const LOGIN_FORM_INITIAL_VALUES: ILoginFormValues = {
    email: "admin@dcd.com",
    password: "Click123$",
    type: "ADMIN",
    rememberToken: true
};

export const FORGOT_PASSWORD_FORM_INITIAL_VALUES: IForgotPasswordFormValues = {
    email: "",
    type: "ADMIN"
};

export const RESET_PASSWORD_FORM_INITIAL_VALUES: IResetPasswordFormValues = {
    token: "",
    password: "",
    confirmPassword: ""
};
