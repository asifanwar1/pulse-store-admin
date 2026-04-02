import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "@/routes/appRoutes";
// import { useForgetPassword } from "../Authentication.Container";
import type { IForgotPasswordFormValues } from "../types";
import type { FormBuilderRef } from "@/components/custom/Form";
import { useRef } from "react";

export function useForgotPasswordContainer() {
    const navigate = useNavigate();
    // const { mutateAsync: forgotPassword, isPending } = useForgetPassword();
    const formRef = useRef<FormBuilderRef<IForgotPasswordFormValues> | null>(
        null,
    );

    const isPending = false;

    const onSubmit = (_values: IForgotPasswordFormValues) => {
        // forgotPassword(values, {
        //     onSuccess: (result) => {
        //         const token = (result as { data?: { token?: string } })?.data
        //             ?.token;
        //         if (token) {
        //             navigate(
        //                 APP_ROUTES.OTP_VERIFICATION.replace(":token", token),
        //                 {
        //                     state: {
        //                         email: values.email,
        //                         type: "ADMIN",
        //                     },
        //                 },
        //             );
        //         }
        //     },
        // });
        navigate(APP_ROUTES.OTP_VERIFICATION);
    };

    return {
        formRef,
        onSubmit,
        isPending: isPending,
    };
}
