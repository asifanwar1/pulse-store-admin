import { FormBuilder } from "@/components/custom/Form";
import Button from "@/components/custom/CustomButton/CustomButton";
import { APP_ROUTES } from "@/routes/appRoutes";
import { Link } from "react-router-dom";
import logo from "@/assets/images/pulse-store-green.png";

import { useLoginContainer } from "./Login.Container";
import AuthWrapper from "../components/AuthWrapper";
import AuthHeader from "../components/AuthHeader";
import { LOGIN_FORM_CONFIG, LOGIN_FORM_INITIAL_VALUES } from "../forms/Config";
import { LOGIN_FORM_SCHEMA } from "../forms/validationSchemas";

const Login = () => {
    const { formRef, onSubmit, isPending } = useLoginContainer();

    return (
        <AuthWrapper>
            <div className="flex flex-col w-full justify-between px-5 py-5 ">
                <AuthHeader
                    logo={logo}
                    title="Hey there, Welcome Back"
                    subtitle="Enter your E-mail and password to continue."
                />
                <FormBuilder
                    ref={formRef}
                    defaultValues={LOGIN_FORM_INITIAL_VALUES}
                    config={LOGIN_FORM_CONFIG}
                    schema={LOGIN_FORM_SCHEMA}
                    onSubmit={onSubmit}
                    className="space-y-5"
                >
                    <div className="flex flex-col justify-end gap-5">
                        <Link
                            to={APP_ROUTES.FORGOT_PASSWORD}
                            className="text-app-green text-15 text-right cursor-pointer font-medium"
                        >
                            Forgot password?
                        </Link>
                        <Button type="submit" isLoading={isPending}>
                            SignIn
                        </Button>
                    </div>
                </FormBuilder>
            </div>
        </AuthWrapper>
    );
};

export default Login;
