import type { UserModel } from "@/api/models/user.model";

export type TLoginBody = {
    email: string;
    password: string;
    type: string;
    rememberToken: boolean;
};

export type TForgetPasswordBody = {
    email: string;
    type: string;
};

export type TForgetPasswordVerificationBody = {
    token: string;
    code: string;
    [key: string]: unknown;
};

export type TResendCodeBody = {
    email: string;
    type: string;
    [key: string]: unknown;
};

export type TResetPasswordBody = {
    token: string;
    password: string;
};
export type TResetPasswordApiBody = Pick<TResetPasswordBody, "token" | "password">;

export type TUpdateUserProfileRequest = Partial<UserModel>;

export type TChangePasswordBody = {
    oldPassword: string;
    newPassword: string;
};
