import type { ReactNode } from "react";

export interface ICustomModalProps {
    /** Whether the modal is open */
    isOpen: boolean;
    /** Function to handle modal close */
    onClose: () => void;
    /** Modal title - renders in header section */
    title?: string;
    /** Modal description - renders in header section */
    description?: string;
    /** Modal content - renders in main content section */
    children: ReactNode;
    /** Custom CSS classes for the modal content */
    className?: string;
    /** Whether to show the close button (default: true) */
    showCloseButton?: boolean;
    /** Whether to close modal on overlay click (default: true) */
    closeOnOverlayClick?: boolean;
    /** Whether to close modal on escape key (default: true) */
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
