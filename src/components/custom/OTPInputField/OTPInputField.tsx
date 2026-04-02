import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type OTPInputFieldProps = {
    length?: number;
    onChange: (value: string) => void;
    value: string;
};

const OTPInputField = ({ length = 4, onChange, value }: OTPInputFieldProps) => {
    return (
        <InputOTP
            value={value}
            onChange={onChange}
            maxLength={length}
            className="flex space-x-3"
        >
            <InputOTPGroup className="flex gap-4">
                {Array.from({ length }).map((_, index) => (
                    <InputOTPSlot
                        key={index}
                        index={index}
                        className={`h-14 w-24 border text-lg font-semibold text-center rounded-lg transition-all
              ${
                  value[index]
                      ? "border-pulse-green text-pulse-green" // Filled input styling
                      : "border-[#e2e8f0] text-gray-400 before:content-['-'] before:text-pulse-green/70"
              }
              focus:border-none focus:ring-0 focus:ring-none outline-none
            `}
                    />
                ))}
            </InputOTPGroup>
        </InputOTP>
    );
};

export default OTPInputField;
