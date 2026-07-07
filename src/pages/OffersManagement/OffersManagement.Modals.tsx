import { Trash2 } from "lucide-react";

import { CustomModal } from "@/components/custom/CustomModal";
import Button from "@/components/custom/CustomButton/CustomButton";

type TDeleteOfferModalProps = {
    open: boolean;
    offerName?: string;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const DeleteOfferModal = ({
    open,
    offerName,
    isDeleting,
    onClose,
    onConfirm,
}: TDeleteOfferModalProps) => {
    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
            closeOnOverlayClick={!isDeleting}
            closeOnEscape={!isDeleting}
            contentClassName="p-6 text-center"
            headerClassName="hidden"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <Trash2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-pulse-green-dark">
                        Delete Offer
                    </h3>
                    <p className="text-sm text-pulse-green">
                        {offerName
                            ? `Are you sure you want to delete "${offerName}"?`
                            : "Are you sure you want to delete this offer?"}
                    </p>
                </div>
                <div className="flex w-full gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        isLoading={isDeleting}
                        disabled={isDeleting}
                        className="mt-0 flex-1 bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </CustomModal>
    );
};
