import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import type { buttonVariants } from "./CustomButton.Constant";

export interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    isLoading?: boolean;
    block?: boolean;
    fsize?: string | number;
    fweight?: string | number;
    fcolor?: string;
    bgcolor?: string;
    bdrcolor?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    margin?: string;
    title?: string;
}

export interface IButtonProps
    extends ICustomButtonProps, VariantProps<typeof buttonVariants> {}
