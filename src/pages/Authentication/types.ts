export interface IWelcomeSectionProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    backgroundImage: string;
    personImage: string;
    className?: string;
}

export interface IAuthHeaderProps {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    logo?: string;
}

export interface IAuthWrapperProps {
    children: React.ReactNode;
}

export interface ILoginFormValues {
    email: string;
    password: string;
    user_type: string;
}

export interface IForgotPasswordFormValues {
    email: string;
    type: string;
}
export interface IResetPasswordFormValues {
    token: string;
    password: string;
    confirmPassword: string;
}

export type TFormFieldConfig<T> = {
    name: keyof T;
    label: string;
    type: string | ((params?: Record<string, unknown>) => string);
    placeholder: string;
    className: string;
    icon?: React.ReactNode;
};
