import * as React from "react";
import { cn } from "@/lib/utils";

import { getInitialsFromName } from "@/utils/common.utils";
import {
    Avatar as BaseAvatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps extends React.ComponentPropsWithoutRef<
    typeof BaseAvatar
> {
    alt?: string;
    src?: string;
    className?: string;
    fallBackClassName?: string;
}

const Avatar = React.forwardRef<
    React.ElementRef<typeof BaseAvatar>,
    AvatarProps
>(({ className, alt = "", src, fallBackClassName, ...props }, ref) => {
    const initials = getInitialsFromName(alt);

    return (
        <BaseAvatar
            ref={ref as any}
            className={cn(
                " overflow-hidden rounded-full",
                className,
                className,
            )}
            {...props}
        >
            <AvatarImage
                className="avatar-img w-full h-full object-cover"
                alt={alt}
                src={src}
                {...props}
            />
            <AvatarFallback
                className={cn(
                    "avatar-fallback flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium !tracking-wider",
                    fallBackClassName,
                )}
            >
                {initials}
            </AvatarFallback>
        </BaseAvatar>
    );
});
Avatar.displayName = "Avatar";

export { Avatar };
