import * as React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    (
        { className, alt, loading = "lazy", draggable = false, ...props },
        ref,
    ) => {
        return (
            <img
                ref={ref}
                alt={alt}
                loading={loading}
                draggable={draggable}
                className={cn("", className)}
                {...props}
            />
        );
    },
);
Image.displayName = "Image";

export default Image;
