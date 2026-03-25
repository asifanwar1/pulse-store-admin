import React from "react";

import { CustomModal } from "@/components/shared/CustomModal";
import { CustomButton } from "@/components/shared/CustomButton";
import trashIcon from "@/assets/icons/bin-icon.svg";

interface IDeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    itemName?: string;
    itemType?: string;
    isLoading?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    size?: "sm" | "md" | "lg";
}

const DeleteConfirmationModal: React.FC<IDeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemName,
    itemType = "item",
    isLoading = false,
    confirmButtonText = "Delete",
    cancelButtonText = "Cancel",
    size = "sm"
}) => {
    const defaultMessage = itemName
        ? `Are you sure you want to delete "${itemName}"?`
        : `Are you sure you want to delete this ${itemType}?`;

    const displayMessage = message || defaultMessage;
    const displayTitle = title || "";

    const handleConfirm = () => {
        onConfirm();
    };

    const footer = (
        <div className="flex justify-center items-center gap-3 mt-5">
            <CustomButton
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="w-full cursor-pointer"
            >
                {cancelButtonText}
            </CustomButton>
            <CustomButton
                variant="default"
                onClick={handleConfirm}
                disabled={isLoading}
                isLoading={isLoading}
                className="bg-[#B00020] text-white w-full cursor-pointer mt-0"
            >
                {confirmButtonText}
            </CustomButton>
        </div>
    );

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
            showCloseButton={false}
            closeOnOverlayClick={false}
            closeOnEscape={false}
            contentClassName="text-center p-5"
            headerClassName="border-none"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center justify-center">
                    <img src={trashIcon} alt="trash" className="w-15 h-15 text-red-600" />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{displayTitle}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                        {displayMessage}
                    </p>
                </div>
                <div className="w-[140px]">{footer}</div>
            </div>
        </CustomModal>
    );
};

export default DeleteConfirmationModal;
