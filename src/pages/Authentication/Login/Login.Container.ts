import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "@/store";
import { useLogin } from "../Authentication.Container";
import type { ILoginFormValues } from "@/pages/Authentication/types";
import { APP_ROUTES } from "@/routes";
import type { FormBuilderRef } from "@/components/shared/FormBuilder/FormBuilder";
import { showToast } from "@/lib/toast";

export function useLoginContainer() {
    const navigate = useNavigate();
    const setAuth = useStore((state) => state.setAuth);
    const { mutateAsync: login, isPending } = useLogin();
    const formRef = useRef<FormBuilderRef<ILoginFormValues> | null>(null);

    const onSubmit = async (data: ILoginFormValues) => {
        const result = await login(data);

        const token = result.token;
        if (token) {
            setAuth({
                isAuthenticated: true,
                token
            });
            showToast.success("Login successful");
            navigate(APP_ROUTES.DASHBOARD);
        }
    };

    return {
        formRef,
        onSubmit,
        isPending
    };
}
