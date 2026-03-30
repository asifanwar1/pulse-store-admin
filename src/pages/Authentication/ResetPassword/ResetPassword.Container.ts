import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useResetPassword } from "../Authentication.Container";
import { APP_ROUTES } from "@/routes";
import type { TResetPasswordApiBody } from "@/api/services/auth/auth.request.types";
import type { FormBuilderRef } from "@/components/shared/FormBuilder/FormBuilder";
import type { IResetPasswordFormValues } from "../types";
import { showToast } from "@/lib/toast";

export function useResetPasswordContainer() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const { mutateAsync: resetPassword, isPending } = useResetPassword();
    const formRef = useRef<FormBuilderRef<IResetPasswordFormValues> | null>(null);

    const onSubmit = async (data: IResetPasswordFormValues) => {
        const payload: TResetPasswordApiBody = {
            token: token ?? "",
            password: data.password
        };
        await resetPassword(payload);
        showToast.success("Password reset successfully");
        navigate(APP_ROUTES.LOGIN);
    };

    return {
        formRef,
        onSubmit,
        isPending
    };
}
