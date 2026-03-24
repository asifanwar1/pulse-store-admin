import React from "react";
import { CustomText } from "../CustomText";

type TCustomAvatarProps = {
    src?: string;
    initials?: string;
    className?: string;
    textClass?: string;
};

const CustomAvatar: React.FC<TCustomAvatarProps> = ({
    src,
    initials,
    className = "",
    textClass = "",
}) => {
    if (src) {
        return (
            <div
                className={`w-40 h-34 rounded-full border-1 border-white shadow-sm flex items-center justify-center ${className}`}
            >
                <img
                    src={src}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
        );
    }

    return (
        <div
            className={`w-40 h-34 rounded-full border-1 border-white shadow-sm flex items-center justify-center ${className}`}
        >
            <CustomText
                text={initials}
                className={`text-3xl font-normal text-app-primary ${textClass}`}
            />
        </div>
    );
};

export default CustomAvatar;
