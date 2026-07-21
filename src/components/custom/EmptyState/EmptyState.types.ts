import type { ReactNode } from "react";

export type EmptyStateProps = {
    icon?: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    actionIcon?: ReactNode;
    className?: string;
    showActionButton?: boolean;
    onAction?: () => void;
};
