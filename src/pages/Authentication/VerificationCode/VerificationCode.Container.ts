import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useForgetPasswordVerification } from "@/hooks/api/auth.queries";
import { APP_ROUTES } from "@/routes/appRoutes";

import { ResendCode } from "../../../api";
import type { TResendCodeResponse } from "../../../api/services/auth/auth.response.types";
import type { TForgetPasswordVerificationBody } from "../../../api/services/auth/auth.request.types";

export function useVerificationCodeContainer() {
    const { token: initialToken } = useParams<{ token: string | undefined }>();
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(initialToken ?? "");
    const [otp, setOtp] = useState<string>("");
    const { mutateAsync: verify, isPending } = useForgetPasswordVerification();
    const { email, type } = location.state || {};
    const [timer, setTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const TIMER_DURATION = 60;

    useEffect(() => {
        const saved = sessionStorage.getItem("verificationTimer");
        const savedTimer = saved ? parseInt(saved) : TIMER_DURATION;

        if (savedTimer === 0) {
            setCanResend(true);
            setTimer(TIMER_DURATION);
        } else if (savedTimer > 0) {
            setTimer(savedTimer);
            setCanResend(false);
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    const newTimer = prev - 1;
                    sessionStorage.setItem(
                        "verificationTimer",
                        newTimer.toString(),
                    );

                    if (newTimer === 0) {
                        setCanResend(true);
                    }

                    return newTimer;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleOtpChange = (value: string) => {
        setOtp(value);
    };

    const handleSubmit = async () => {
        if (otp.length !== 4 || !token) {
            return;
        }
        const payload: TForgetPasswordVerificationBody = {
            code: otp,
            token: token,
        };
        const result = (await verify(payload)) as { data?: { token?: string } };
        const newToken = result?.data?.token;
        if (newToken) {
            navigate(APP_ROUTES.RESET_PASSWORD.replace(":token", newToken));
        }
    };

    const handleResend = async () => {
        if (!email) return;
        const response = await ResendCode({ email, type });
        const data = response as TResendCodeResponse;
        const newToken = data?.token ?? "";
        if (newToken) {
            setToken(newToken);
            const newUrl = location.pathname.replace(token, newToken);
            navigate(newUrl, {
                state: {
                    email,
                    type,
                },
                replace: true,
            });
        }
        setCanResend(false);
        setTimer(TIMER_DURATION);
        setOtp("");
    };
    const OTP_LENGTH = 4;

    const isSubmitDisabled = otp.length !== OTP_LENGTH || isPending;

    return {
        otp,
        timer,
        canResend,
        isLoading: isPending,
        isSubmitDisabled,
        OTP_LENGTH,
        handleOtpChange,
        handleSubmit,
        handleResend,
    };
}
