import { Link } from "react-router-dom";

import Button from "@/components/custom/CustomButton/CustomButton";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useResetPasswordContainer } from "./ResetPassword.Container";
import AuthWrapper from "../components/AuthWrapper";
import AuthHeader from "../components/AuthHeader";
import {
    RESET_PASSWORD_FORM_CONFIG,
    RESET_PASSWORD_FORM_INITIAL_VALUES,
} from "../forms/Config";
import { RESET_PASSWORD_FORM_SCHEMA } from "../forms/validationSchemas";
import { FormBuilder } from "@/components/custom/Form";
import type { IResetPasswordFormValues } from "../types";

const ResetPassword = () => {
    const { formRef, onSubmit, isPending } = useResetPasswordContainer();

    return (
        <AuthWrapper>
            <div className="flex flex-col w-full items-center justify-between px-4">
                <div className="w-full max-w-md">
                    <AuthHeader
                        logo={undefined}
                        title="Update Password"
                        subtitle="Create a new password."
                    />
                    <FormBuilder<IResetPasswordFormValues>
                        ref={formRef}
                        defaultValues={RESET_PASSWORD_FORM_INITIAL_VALUES}
                        config={RESET_PASSWORD_FORM_CONFIG}
                        schema={RESET_PASSWORD_FORM_SCHEMA}
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div className="flex flex-col mt-4">
                            <Button type="submit" isLoading={isPending}>
                                Change Password
                            </Button>
                        </div>
                    </FormBuilder>
                </div>
                <div>
                    <p className="text-pulse-green text-[16px] mt-4">
                        Back to{" "}
                        <Link
                            to={APP_ROUTES.LOGIN}
                            className="text-pulse-green hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default ResetPassword;
