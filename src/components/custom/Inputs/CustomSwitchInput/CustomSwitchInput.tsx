import clsx from "clsx";
import type { CustomSwitchInputProps } from "./types";

const CustomSwitchInput = ({
    label = "Block",
    activeLabel = "Active",
    isChecked = false,
    size = "",
    error,
    onClick = () => {}
}: CustomSwitchInputProps) => {
    return (
        <div onClick={onClick} className="cursor-pointer">
            <div
                className={clsx(
                    "flex items-center border rounded-full p-1 transition-all duration-300 relative",
                    isChecked ? "border-app-primary bg-app-white" : "border-[#DCE0E4] bg-app-white",
                    {
                        "w-20 h-8": size === "small",
                        "w-28 h-12": size === "large"
                    }
                )}
            >
                {isChecked ? (
                    <>
                        <span className="text-xs text-app-secondary font-normal ml-1">
                            {activeLabel}
                        </span>
                        <div className="w-4 h-4 bg-app-primary rounded-full transition-transform duration-300 transform translate-x-full absolute right-6"></div>
                    </>
                ) : (
                    <>
                        <div className="w-4 h-4 bg-[#C7C6C6] rounded-full transition-transform duration-300 absolute"></div>
                        <span className="text-xs text-app-secondary font-normal ml-5">{label}</span>
                    </>
                )}
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
};

export default CustomSwitchInput;
