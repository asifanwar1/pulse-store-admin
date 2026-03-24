import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { type IButtonProps } from "./types";
import { buttonVariants } from "./CustomButton.Constants";

const CustomButton = React.forwardRef<HTMLButtonElement, IButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            isLoading = false,
            block = false,
            fsize,
            fweight,
            fcolor,
            bgcolor,
            bdrcolor,
            startIcon,
            endIcon,
            margin,
            title,
            children,
            disabled,
            type = "button",
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";

        const classes = cn(
            buttonVariants({ variant, size, className }),
            block && "w-full",
        );

        const style: React.CSSProperties = {
            ...(fsize != null
                ? { fontSize: typeof fsize === "number" ? `${fsize}px` : fsize }
                : {}),
            ...(fweight != null ? { fontWeight: fweight } : {}),
            ...(fcolor ? { color: fcolor } : {}),
            ...(bgcolor ? { backgroundColor: bgcolor } : {}),
            ...(bdrcolor ? { borderColor: bdrcolor } : {}),
            ...(margin ? { margin } : {}),
        };

        const content = isLoading ? (
            <>
                <Loader2 className="animate-spin" />
                {title ?? children}
            </>
        ) : (
            <>
                {startIcon && <span className="mr-2">{startIcon}</span>}
                {title ?? children}
                {endIcon && <span className="ml-2">{endIcon}</span>}
            </>
        );

        return (
            <Comp
                ref={ref}
                className={classes}
                style={style}
                disabled={disabled || isLoading}
                type={type}
                {...props}
            >
                {content}
            </Comp>
        );
    },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
