import { ArrowLeft, Trash2 } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import {
    type ManageOrderFormValues,
    INITIAL_ORDER_VALUES,
} from "./ManageOrder.schema";
import { useManageOrder } from "./ManageOrder.Container";
import type { ManageOrderFormProps } from "../OrderManagement.types";
import { QuantitySelector } from "@/components/custom/Inputs/QuantitySelector";

const ManageOrder: React.FC<ManageOrderFormProps> = ({ mode }) => {
    const {
        formRef,
        formConfig,
        ManageOrderSchema,
        isSubmitting,
        selectedProducts,
        handleCancel,
        handleSubmit,
        handleQuantityChange,
        handleRemoveProduct,
    } = useManageOrder({ mode });

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
                    Back to Orders
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        Create an Order
                    </h3>
                    <p className="text-xs text-pulse-green">
                        Fill in the details to create a new order in the system
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                        <FormBuilder<ManageOrderFormValues>
                            ref={formRef}
                            config={formConfig}
                            schema={ManageOrderSchema}
                            defaultValues={INITIAL_ORDER_VALUES}
                            onSubmit={handleSubmit}
                            className="grid grid-cols-12 gap-4"
                            noValidate
                        >
                            <div className="flex flex-wrap justify-end gap-3">
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
                                    Create Order
                                </Button>
                            </div>
                        </FormBuilder>
                    </div>

                    {selectedProducts.length > 0 && (
                        <div className="bg-white rounded-2xl border p-4">
                            <h4 className="text-sm font-semibold">
                                Selected products
                            </h4>
                            <div className="space-y-3 mt-4">
                                {selectedProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.productName}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <QuantitySelector
                                                value={item.quantity}
                                                onChange={(qty) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        qty,
                                                    )
                                                }
                                                min={1}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveProduct(item.id)
                                                }
                                                className="p-2 rounded-md text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
