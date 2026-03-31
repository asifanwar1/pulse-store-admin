import { useEffect, useCallback } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/custom/visually-hidden";
import { cn } from "@/lib/utils";
import type { ICustomModalProps } from "./CustomModal.types";
import { sizeClasses } from "./CustomModal.Constant";

export const CustomModal = ({
    isOpen,
    onClose,
    children,
    className,
    title,
    description,
    showCloseButton = false,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    size = "md",
    isLoading = false,
    loadingText = "Loading...",
    loadingComponent,
    preventBodyScroll = true,
    contentClassName,
    headerClassName,
    cardClassName,
    titleClassName,
    footer,
}: ICustomModalProps) => {
    // Memoized event handlers for better performance
    const handleEscapeKey = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && closeOnEscape) {
                onClose();
            }
        },
        [closeOnEscape, onClose],
    );

    const handleOpenChange = useCallback(
        (open: boolean) => {
            if (!open) {
                onClose();
            }
        },
        [onClose],
    );

    const handlePointerDownOutside = useCallback(
        (e: Event) => {
            if (!closeOnOverlayClick) {
                e.preventDefault();
            }
        },
        [closeOnOverlayClick],
    );

    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener("keydown", handleEscapeKey);

        if (preventBodyScroll) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
            if (preventBodyScroll) {
                document.body.style.overflow = "unset";
            }
        };
    }, [isOpen, handleEscapeKey, preventBodyScroll]);

    const defaultLoadingComponent = (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            {loadingText}
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    sizeClasses[size],
                    "bg-white border-0 shadow-none",
                    className,
                )}
                showCloseButton={showCloseButton}
                onPointerDownOutside={handlePointerDownOutside}
            >
                <div
                    className={cn("relative flex flex-col mb-2", cardClassName)}
                >
                    {(title || description) && (
                        <DialogHeader
                            className={cn("relative", headerClassName)}
                        >
                            {title && (
                                <div className="flex items-center justify-between">
                                    <div />
                                    <DialogTitle
                                        className={cn(
                                            "text-xl font-semibold text-center flex-1",
                                            titleClassName,
                                        )}
                                    >
                                        {title}
                                    </DialogTitle>
                                </div>
                            )}
                            {description && (
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>
                    )}

                    {!title && (
                        <VisuallyHidden>
                            <DialogTitle>Modal</DialogTitle>
                        </VisuallyHidden>
                    )}

                    <div className={cn("flex-1 px-8 py-4", contentClassName)}>
                        {isLoading && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
                                {loadingComponent || defaultLoadingComponent}
                            </div>
                        )}
                        {children}
                    </div>

                    {footer && (
                        <DialogFooter className="px-8 py-4 ">
                            {footer}
                        </DialogFooter>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
