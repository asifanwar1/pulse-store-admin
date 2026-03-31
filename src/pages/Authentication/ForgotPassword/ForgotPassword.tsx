import { FormBuilder } from "@/components/custom/Form";
import Button from "@/components/custom/CustomButton/CustomButton";
import { APP_ROUTES } from "@/routes/appRoutes";
import { Link } from "react-router-dom";
import logo from "@/assets/images/pulse-store-black.png";

import { useForgotPasswordContainer } from "./ForgotPassword.Container";
import AuthWrapper from "../components/AuthWrapper";
import AuthHeader from "../components/AuthHeader";
import {
    FORGOT_PASSWORD_FORM_CONFIG,
    FORGOT_PASSWORD_FORM_INITIAL_VALUES,
} from "../forms/Config";
import { FORGOT_PASSWORD_FORM_SCHEMA } from "../forms/validationSchemas";

const ForgotPassword = () => {
    const { formRef, onSubmit, isPending } = useForgotPasswordContainer();

    return (
        <AuthWrapper>
            <div className="flex flex-col w-full items-center justify-between bg-white px-4">
                <div className="w-full max-w-md">
                    <AuthHeader
                        logo={logo}
                        title="Forgot your password?"
                        subtitle="Reset your password via email."
                    />
                    <FormBuilder
                        ref={formRef}
                        defaultValues={FORGOT_PASSWORD_FORM_INITIAL_VALUES}
                        config={FORGOT_PASSWORD_FORM_CONFIG}
                        schema={FORGOT_PASSWORD_FORM_SCHEMA}
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <Button type="submit" isLoading={isPending}>
                            Send OTP
                        </Button>
                    </FormBuilder>
                </div>
                <div className="">
                    <p className="text-app-secondary text-[16px] mt-4">
                        Back to{" "}
                        <Link
                            to={APP_ROUTES.LOGIN}
                            className="text-app-secondary hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default ForgotPassword;
