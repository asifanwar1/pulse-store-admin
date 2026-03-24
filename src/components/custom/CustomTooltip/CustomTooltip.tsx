import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import type { TCustomTooltipProps } from "./types";

export function CustomTooltip({
    content,
    children,
    className,
    side = "top",
    sideOffset = 8,
    delayDuration = 200,
}: TCustomTooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={delayDuration}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={side}
                        align="center"
                        sideOffset={sideOffset}
                        className={cn(
                            "tooltip-content",
                            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                            className,
                        )}
                    >
                        {content}
                        {/* <TooltipPrimitive.Arrow className="tooltip-arrow translate-y-[calc(-50%_-_2px)]" /> */}
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}

export default CustomTooltip;
