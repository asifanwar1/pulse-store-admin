import { CustomModal } from "@/components/shared/CustomModal";
import { CustomButton } from "@/components/shared/CustomButton";

const WarningModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}) => {
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            showCloseButton={false}
            closeOnOverlayClick={!isLoading}
            closeOnEscape={!isLoading}
            contentClassName="py-6 text-center"
            headerClassName="border-none pb-0"
        >
            <div className="flex flex-col items-center gap-4 mt-5">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">Delete Uploaded Files?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                        If unchecked, the previously uploaded files for this option will be deleted.
                        This action cannot be undone.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 w-full ">
                    <CustomButton
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 mt-10"
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        variant="default"
                        onClick={onConfirm}
                        disabled={isLoading}
                        isLoading={isLoading}
                        className="bg-[#B00020] text-white flex-1"
                    >
                        Continue
                    </CustomButton>
                </div>
            </div>
        </CustomModal>
    );
};

export default WarningModal;
