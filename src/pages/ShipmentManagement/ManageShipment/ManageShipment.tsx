import { ArrowLeft } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { MANAGE_SHIPMENT_FORM_CONFIG } from "./ManageShipment.config";
import {
    type ManageShipmentFormValues,
    INITIAL_SHIPMENT_VALUES,
    ManageShipmentSchema,
} from "./ManageShipment.schema";
import { useManageShipment } from "./ManageShipment.Container";
import type { ManageShipmentFormProps } from "../ShipmentManagement.types";
import ProductOrderCard from "@/components/custom/CustomCards/ProductOrderCard";
import type { TOrderItemResponse } from "@/api/services/orders/orders.response.types";

const BoxURL =
    "https://dftybolqcutmxzqcsogd.supabase.co/storage/v1/object/public/pulsestore/products/beige-box.jpg";

const ManageShipment: React.FC<ManageShipmentFormProps> = ({ mode }) => {
    const {
        NO_VALUE,
        formRef,
        isSubmitting,
        orderDetails,
        handleSubmit,
        handleNavigateBack,
        handleNavigateToProduct,
    } = useManageShipment({ mode });

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button
                    onClick={handleNavigateBack}
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        Shipment Details
                    </h3>
                    <p className="text-xs text-pulse-green">
                        Fill in the shipment information for order id:{" "}
                        {orderDetails.id}
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
                >
                    <div className="flex items-center justify-end gap-3 pb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleNavigateBack}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" size="sm" disabled={isSubmitting}>
                            {mode === "add"
                                ? "Create Shipment"
                                : "Save Changes"}
                        </Button>
                    </div>
                </FormBuilder>
            </div>
            {orderDetails?.items && orderDetails?.items.length > NO_VALUE && (
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-lg font-semibold text-pulse-green-dark">
                        Ordered Items
                    </h3>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {orderDetails?.items.map((item: TOrderItemResponse) => (
                            <ProductOrderCard
                                key={item.id}
                                image={BoxURL}
                                title={item.product_name || "-"}
                                category={item.product_category}
                                unitPrice={item.unit_price}
                                totalAmount={item.total_amount}
                                quantity={item.quantity}
                                sku={item.product_sku}
                                onClick={() => handleNavigateToProduct(item.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageShipment;
