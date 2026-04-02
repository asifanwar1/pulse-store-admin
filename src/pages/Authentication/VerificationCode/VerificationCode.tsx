import logo from "@/assets/images/pulse-store-green.png";

import Button from "@/components/custom/CustomButton/CustomButton";
import OTPInputField from "@/components/custom/OTPInputField/OTPInputField";
import { useVerificationCodeContainer } from "./VerificationCode.Container";
import AuthWrapper from "../components/AuthWrapper";
import AuthHeader from "../components/AuthHeader";

const VerificationCode = () => {
    const {
        otp,
        timer,
        canResend,
        isLoading,
        isSubmitDisabled,
        OTP_LENGTH,
        handleOtpChange,
        handleSubmit,
        handleResend,
    } = useVerificationCodeContainer();

    return (
        <AuthWrapper>
            <div className="flex flex-col w-full items-center justify-between  px-4">
                <div className="w-full max-w-md">
                    <AuthHeader
                        logo={logo}
                        title="Enter OTP"
                        subtitle="Enter the code sent to your email to verify your identity."
                    />

                    <div className="space-y-4">
                        <div className="flex justify-center mb-4">
                            <OTPInputField
                                length={OTP_LENGTH}
                                value={otp}
                                onChange={handleOtpChange}
                            />
                        </div>

                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitDisabled}
                            className="w-full"
                        >
                            {isLoading ? "Verifying..." : "Submit"}
                        </Button>
                    </div>
                </div>

                <div className="text-center">
                    {canResend ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-pulse-green hover:underline text-[16px] mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Resend Code
                        </button>
                    ) : (
                        <p className="text-app-secondary text-[16px] mt-4">
                            Resend Code in{" "}
                            <span>
                                ({timer < 10 ? `00:0${timer}` : `00:${timer}`})
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </AuthWrapper>
    );
};

export default VerificationCode;
