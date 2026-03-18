import type {
    TLoginBody,
    TForgetPasswordBody,
    TForgetPasswordVerificationBody,
    TResendCodeBody,
    TResetPasswordApiBody,
    TUpdateUserProfileRequest,
    TChangePasswordBody
} from "./auth.request.types";
import type {
    TLoginResponse,
    TGetMeResponse,
    TForgetPasswordResponse,
    TForgetPasswordVerificationResponse,
    TResetPasswordResponse,
    TSuccessResponse,
    TResendCodeResponse,
    TChangePasswordResponse
} from "./auth.response.types";
import { HTTP_METHODS } from "@/constants";
import { request } from "@/api/client/request";

export const LoginApi = (body: TLoginBody) => {
    return request<TLoginResponse, TLoginBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/login",
        body: body
    });
};

export const GetMe = async (token?: string) => {
    return request<TGetMeResponse, undefined>({
        method: HTTP_METHODS.GET,
        url: "/users/me",
        token
    });
};
export const ForgetPasswordApi = async (body: TForgetPasswordBody) => {
    return request<TForgetPasswordResponse, TForgetPasswordBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/forget-password",
        body
    });
};

export const ForgetPasswordVerification = async (body: TForgetPasswordVerificationBody) => {
    return request<TForgetPasswordVerificationResponse, TForgetPasswordVerificationBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/forget-password/verification",
        body
    });
};

export const ResendCode = async (body: TResendCodeBody) => {
    return request<TResendCodeResponse, TResendCodeBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/forget-password",
        body
    });
};

export const ResetPassword = async (body: TResetPasswordApiBody) => {
    return request<TResetPasswordResponse, TResetPasswordApiBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/reset-password",
        body
    });
};

export const LogoutUser = async () => {
    return request<TSuccessResponse, undefined>({
        method: HTTP_METHODS.POST,
        url: "/auth/logout"
    });
};

export const UpdateUserProfile = async (id: number, body: TUpdateUserProfileRequest) => {
    return request<TSuccessResponse, TUpdateUserProfileRequest>({
        method: HTTP_METHODS.PATCH,
        url: `/users/${id}`,
        body
    });
};

export const ChangePassword = async (body: TChangePasswordBody) => {
    return request<TChangePasswordResponse, TChangePasswordBody>({
        method: HTTP_METHODS.POST,
        url: "/auth/change-password",
        body
    });
};
