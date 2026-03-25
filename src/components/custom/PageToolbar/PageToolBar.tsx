import React from "react";

import { cn } from "@/lib/utils";
import type { IPageToolbarProps } from "./PageToolBar.types";

const PageToolbar: React.FC<IPageToolbarProps> = ({ leftContent, rightContent, className }) => (
    <div
        className={cn(
            "flex flex-col gap-2 flex-wrap sm:flex-row sm:items-center sm:justify-between w-full py-2 px-1",
            className
        )}
    >
        <div className="flex items-center gap-2 ">{leftContent}</div>
        <div className="flex items-center gap-2">{rightContent}</div>
    </div>
);

export default PageToolbar;
