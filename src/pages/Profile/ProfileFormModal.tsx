import { CustomModal } from "@/components/custom/CustomModal";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { PROFILE_FORM_CONFIG } from "./ProfileForm.Config";
import { PROFILE_FORM_SCHEMA, type ProfileFormValues } from "./ProfileSchema";

type TProfileFormModalProps = {
    open: boolean;
    isSubmitting: boolean;
    formRef: any;
    initialValues: ProfileFormValues;
    onClose: () => void;
    onSubmit: (values: ProfileFormValues) => void;
};

const ProfileFormModal = ({
    open,
    isSubmitting,
    initialValues,
    formRef,
    onClose,
    onSubmit,
}: TProfileFormModalProps) => {
    return (
        <CustomModal
            isOpen={open}
            onClose={onClose}
            title="Update Profile"
            size="md"
            showCloseButton
            closeOnOverlayClick={!isSubmitting}
            closeOnEscape={!isSubmitting}
            contentClassName="px-8 py-2"
            titleClassName="text-pulse-green-dark"
        >
            <FormBuilder
                ref={formRef}
                defaultValues={initialValues}
                config={PROFILE_FORM_CONFIG}
                schema={PROFILE_FORM_SCHEMA}
                onSubmit={onSubmit}
            >
                <div className="flex w-full justify-end gap-3">
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
                        Save Changes
                    </CustomButton>
                </div>
            </FormBuilder>
        </CustomModal>
    );
};

export default ProfileFormModal;
