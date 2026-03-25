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
                  ? "border-gray-500 text-black" // Filled input styling
                  : "border-gray-300 text-gray-400 before:content-['-'] before:text-gray-400"
              }
              focus:border-primary focus:ring-2 focus:ring-primary outline-none
            `}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OTPInputField;
