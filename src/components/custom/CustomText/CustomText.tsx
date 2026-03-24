import { safeStringConversion, truncateString } from "@/utils/stringUtils";
import { CustomTooltip } from "../CustomTooltip";
import type { ICustomTextProps } from "./CustomText.types";

export const CustomText = ({
    text = "",
    maxLength = 50,
    className,
    tooltipClass,
}: ICustomTextProps) => {
    const fullText = safeStringConversion(text);
    const isTruncated = fullText.length > maxLength;
    const displayedText = isTruncated
        ? truncateString(fullText, maxLength)
        : fullText;

    const content = <div className={className}>{displayedText}</div>;

    return isTruncated ? (
        <CustomTooltip content={fullText} className={tooltipClass}>
            {content}
        </CustomTooltip>
    ) : (
        content
    );
};
