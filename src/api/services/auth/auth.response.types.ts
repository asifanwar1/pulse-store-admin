import type { UserModel } from "@/api/models/user.model";

export type TLoginResponse = {
    token: string;
    refreshToken: string;
    tokentype: string;
};

export type TGetMeResponse = UserModel;

export type TForgetPasswordResponse = {
    token: string;
};

export type TForgetPasswordVerificationResponse = {
    token: string;
};

export type TResendCodeResponse = {
    token: string;
};

export type TResetPasswordResponse = {
    token: string;
};

export type TSuccessResponse = {
    data: boolean;
};

export type TChangePasswordResponse = {
    token: string;
};
