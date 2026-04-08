import { ArrowLeft } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { MANAGE_SHIPMENT_FORM_CONFIG } from "./ManageShipment.config";
import {
    type ManageShipmentFormValues,
    INITIAL_SHIPMENT_VALUES,
} from "./ManageShipment.schema";
import { useManageShipment } from "./ManageShipment.Container";
import type { ManageShipmentFormProps } from "../ShipmentManagement.types";

const ManageShipment: React.FC<ManageShipmentFormProps> = ({ mode }) => {
    const {
        formRef,
        ManageShipmentSchema,
        isSubmitting,
        handleCancel,
        handleSubmit,
        triggerSubmit,
    } = useManageShipment({ mode });

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
                    Back to Shipments
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        Shipment Details
                    </h3>
                    <p className="text-xs text-pulse-green">
                        Fill in the shipment information, carrier details, and
                        origin &amp; destination addresses
                    </p>
                </div>

                <FormBuilder<ManageShipmentFormValues>
                    ref={formRef}
                    config={MANAGE_SHIPMENT_FORM_CONFIG}
                    schema={ManageShipmentSchema}
                    defaultValues={INITIAL_SHIPMENT_VALUES}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-12 gap-4"
                    noValidate
                />
            </div>

            <div className="flex items-center justify-end gap-3 pb-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    onClick={triggerSubmit}
                    disabled={isSubmitting}
                >
                    {mode === "add" ? "Create Shipment" : "Save Changes"}
                </Button>
            </div>
        </div>
    );
};

export default ManageShipment;
