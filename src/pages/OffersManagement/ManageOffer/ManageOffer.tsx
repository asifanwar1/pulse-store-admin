import { ArrowLeft } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { type ManageOfferFormValues } from "./ManageOffer.schema";
import { useManageOffer } from "./ManageOffer.Container";
import type { ManageOfferFormProps } from "../OffersManagement.types";
import ManageOfferSkeleton from "./ManageOfferSkeleton";
import { ACTION_MODES } from "@/constants/action-modes.constants";

const ManageOffer: React.FC<ManageOfferFormProps> = ({ mode }) => {
    const {
        formRef,
        formConfig,
        ManageOfferSchema,
        isSubmitting,
        isLoading,
        offerFormDefaultValues,
        handleCancel,
        handleSubmit,
    } = useManageOffer({ mode });

    if (isLoading) {
        return <ManageOfferSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button
                    onClick={handleCancel}
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Offers
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        {mode === ACTION_MODES.ADD
                            ? "New Offer"
                            : "Update Offer"}
                    </h3>
                    <p className="text-xs text-pulse-green mt-0.5">
                        Fill in the details below to create a promotional
                        offer for your catalogue
                    </p>
                </div>

                <FormBuilder<ManageOfferFormValues>
                    ref={formRef}
                    config={formConfig}
                    schema={ManageOfferSchema}
                    defaultValues={offerFormDefaultValues}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-12 gap-4"
                    noValidate
                >
                    <div className="col-span-12 flex flex-wrap justify-end gap-3 pt-2 border-t border-pulse-cream-dark">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Save Offer
                        </Button>
                    </div>
                </FormBuilder>
            </div>
        </div>
    );
};

export default ManageOffer;
