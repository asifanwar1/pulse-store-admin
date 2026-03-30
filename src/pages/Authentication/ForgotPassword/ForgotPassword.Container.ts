import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "@/routes";
import { useForgetPassword } from "../Authentication.Container";
import type { IForgotPasswordFormValues } from "../types";
import type { FormBuilderRef } from "@/components/shared/FormBuilder/FormBuilder";
import { useRef } from "react";

export function useForgotPasswordContainer() {
    const navigate = useNavigate();
    const { mutateAsync: forgotPassword, isPending } = useForgetPassword();
    const formRef = useRef<FormBuilderRef<IForgotPasswordFormValues> | null>(null);

    const onSubmit = (values: IForgotPasswordFormValues) => {
        forgotPassword(values, {
            onSuccess: (result) => {
                const token = (result as { data?: { token?: string } })?.data?.token;
                if (token) {
                    navigate(APP_ROUTES.OTP_VERIFICATION.replace(":token", token), {
                        state: {
                            email: values.email,
                            type: "ADMIN"
                        }
                    });
                }
            }
        });
    };

    return {
        formRef,
        onSubmit,
        isPending: isPending
    };
}
