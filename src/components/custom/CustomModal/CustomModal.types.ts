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
    /** Custom CSS classes for the modal header */
    headerClassName?: string;
    /** Modal size variants */
    size?: "sm" | "md" | "lg" | "xl" | "full" | "custom";
    /** Footer content - renders in footer section */
    footer?: ReactNode;
    /** Whether to show a loading state */
    isLoading?: boolean;
    /** Loading text */
    loadingText?: string;
    /** Custom loading component */
    loadingComponent?: ReactNode;
    /** Whether to prevent body scroll when modal is open (default: true) */
    preventBodyScroll?: boolean;
    /** Custom CSS classes for the card wrapper */
    cardClassName?: string;
    /** Custom CSS classes for the content wrapper */
    contentClassName?: string;
    titleClassName?: string;
}
