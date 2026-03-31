import * as React from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { CustomButton } from "@/components/custom/CustomButton";
import { Check } from "lucide-react";
import { APP_ROUTES } from "@/routes/appRoutes";
import { useNavigate } from "react-router-dom";

export type TSuccessModalProps = {
    open: boolean;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    entityName?: string;
    addNewText?: string;
    goBackText?: string;
    backRoute?: string;
    onAddNew?: () => void;
    onClose?: () => void;
    isLoading?: boolean;
    hideCloseButton?: boolean;
};

const SuccessModal: React.FC<TSuccessModalProps> = ({
    open,
    icon = <Check size={32} className="text-green-500" />,
    title = "",
    entityName = "Color",
    description = " has been saved successfully",
    addNewText = "Add New",
    goBackText = "Back to Listing",
    backRoute = APP_ROUTES.DASHBOARD,
    onAddNew = () => {},
    onClose = () => {},
    isLoading = false,
    hideCloseButton = false,
}) => {
    const navigate = useNavigate();
    const handleNavigateBack = () => {
        navigate(backRoute);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose?.();
        }
    };
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className="max-w-sm w-1/3 rounded-2xl p-8 flex flex-col items-center text-center bg-white"
                showCloseButton={hideCloseButton}
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
                        <DialogDescription className="mb-6 text-base text-muted-foreground text-center">
                            {entityName} {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter className="flex w-full gap-4 mt-4">
                    <CustomButton
                        variant="outline"
                        className="flex-1"
                        type="button"
                        onClick={handleNavigateBack}
                        disabled={isLoading}
                    >
                        {goBackText}
                    </CustomButton>
                    <CustomButton
                        variant="secondary"
                        className="flex-1"
                        type="button"
                        onClick={onAddNew}
                        isLoading={isLoading}
                    >
                        {addNewText}
                    </CustomButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessModal;
