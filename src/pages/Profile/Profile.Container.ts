import { useRef } from "react";
import { useGetUserById } from "@/hooks/api/user.queries";
import { useStore } from "@/store";
import { formatAddress } from "@/utils/stringUtils";
import { useNavigate } from "react-router-dom";
import type { FormBuilderRef } from "@/components/custom/Form";
import type { IResetPasswordFormValues } from "../Authentication/types";
import { useResetPassword } from "@/hooks/api/auth.queries";
import type { TResetPasswordApiBody } from "@/api/services/auth/auth.request.types";
import { showToast } from "@/lib/toast";

export const useProfile = () => {
    const navigate = useNavigate();
    const state = useStore((state) => {
        return state;
    });
    const formRef = useRef<FormBuilderRef<IResetPasswordFormValues> | null>(
        null,
    );

    const { data: profile, isLoading: isProfileLoading } = useGetUserById(
        state.user?.id,
    );

    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const handleNavigateBack = () => navigate(-1);

    const address = formatAddress(profile?.address!);

    const onSubmit = async (data: IResetPasswordFormValues) => {
        const payload: TResetPasswordApiBody = {
            token: state.token ?? "",
            password: data.password,
        };
        await resetPassword(payload);
        showToast.success("Password reset successfully");
    };

    return {
        profile,
        address,
        formRef,
        isProfileLoading,
        isPending,
        onSubmit,
        handleNavigateBack,
    };
};
