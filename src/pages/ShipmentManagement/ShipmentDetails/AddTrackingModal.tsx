import type { Ref } from "react";
import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder, type FormBuilderRef } from "@/components/custom/Form";
import { ADD_TRACKING_FORM_CONFIG } from "./AddTracking.config";
import {
    AddTrackingSchema,
    INITIAL_TRACKING_VALUES,
    type AddTrackingFormValues,
} from "./AddTracking.schema";

type AddTrackingModalProps = {
    open: boolean;
    isSubmitting: boolean;
    formRef: Ref<FormBuilderRef<AddTrackingFormValues>>;
    onClose: () => void;
    onSubmit: (values: AddTrackingFormValues) => void;
};

const AddTrackingModal = ({
    open,
    isSubmitting,
    formRef,
    onClose,
    onSubmit,
}: AddTrackingModalProps) => {
    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title="Add Tracking Update"
            size="md"
            showCloseButton
            closeOnOverlayClick={!isSubmitting}
            closeOnEscape={!isSubmitting}
            contentClassName="px-8 py-2"
            titleClassName="text-pulse-green-dark"
        >
            <FormBuilder<AddTrackingFormValues>
                ref={formRef}
                defaultValues={INITIAL_TRACKING_VALUES}
                config={ADD_TRACKING_FORM_CONFIG}
                schema={AddTrackingSchema}
                onSubmit={onSubmit}
                noValidate
            >
                <div className="flex w-full justify-end gap-3 pt-2">
                    <CustomButton
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        Add Update
                    </CustomButton>
                </div>
            </FormBuilder>
        </CustomModal>
    );
};

export default AddTrackingModal;
