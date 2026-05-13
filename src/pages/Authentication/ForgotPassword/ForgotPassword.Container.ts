import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "@/routes/appRoutes";
import { useForgetPassword } from "@/hooks/api/auth.queries";
import type { IForgotPasswordFormValues } from "../types";
import type { FormBuilderRef } from "@/components/custom/Form";
import { useRef } from "react";

export function useForgotPasswordContainer() {
    const navigate = useNavigate();
    const { mutateAsync: forgotPassword, isPending } = useForgetPassword();
    const formRef = useRef<FormBuilderRef<IForgotPasswordFormValues> | null>(
        null,
    );

    const onSubmit = (values: IForgotPasswordFormValues) => {
        forgotPassword(values, {
            onSuccess: (result) => {
                const token = (result as { token?: string })?.token;
                if (token) {
                    navigate(
                        APP_ROUTES.OTP_VERIFICATION.replace(":token", token),
                        {
                            state: {
                                email: values.email,
                                type: "ADMIN",
                            },
                        },
                    );
                }
            },
        });
    };

    return {
        formRef,
        isPending,
        onSubmit,
    };
}
