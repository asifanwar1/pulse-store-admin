import type { ReactNode } from "react";

export interface ICustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    headerClassName?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full" | "custom";
    footer?: ReactNode;
    isLoading?: boolean;
    loadingText?: string;
    loadingComponent?: ReactNode;
    preventBodyScroll?: boolean;
    cardClassName?: string;
    contentClassName?: string;
    titleClassName?: string;
}
