import type { ReactNode } from "react";

export type TCustomTooltipProps = {
    content: ReactNode;
    children: ReactNode;
    className?: string;
    side?: "top" | "bottom" | "left" | "right";
    sideOffset?: number;
    delayDuration?: number;
};
