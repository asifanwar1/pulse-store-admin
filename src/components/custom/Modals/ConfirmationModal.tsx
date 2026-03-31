import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import CustomButton from "@/components/custom/CustomButton/CustomButton";

export interface IConfirmationModalProps {
    open: boolean;
    icon?: React.ReactNode;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onSuccess: () => void;
    onClose: () => void;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
    open,
    icon,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onSuccess,
    onClose,
    isLoading = false,
}) => {
    return (
        <Dialog open={open}>
            <DialogContent
                className="max-w-sm w-1/3 rounded-2xl p-8 flex flex-col items-center text-center bg-white"
                showCloseButton={false}
            >
                {icon && (
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/30">
                        {icon}
                    </div>
                )}
                <DialogHeader className="w-full">
                    <DialogTitle className="text-xl font-semibold mb-2 text-center">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-base text-muted-foreground text-center">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter className="flex w-full gap-4 mt-3">
                    <CustomButton
                        variant="outline"
                        className="flex-1"
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </CustomButton>
                    <CustomButton
                        variant="secondary"
                        className="flex-1"
                        type="button"
                        onClick={onSuccess}
                        isLoading={isLoading}
                    >
                        {confirmText}
                    </CustomButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
