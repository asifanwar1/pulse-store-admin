import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import {
    type ManageOrderFormValues,
    INITIAL_ORDER_VALUES,
} from "./ManageOrder.schema";
import { useManageOrder } from "./ManageOrder.Container";
import { Input } from "@/components/custom/Input";
import { cn } from "@/lib/utils";
import type { ManageOrderFormProps } from "../OrderManagement.types";

const ManageOrder: React.FC<ManageOrderFormProps> = ({ mode }) => {
    const {
        formRef,
        formConfig,
        ManageOrderSchema,
        isSubmitting,
        items,
        itemErrors,
        handleCancel,
        handleSubmit,
        triggerSubmit,
        addItem,
        removeItem,
        updateItem,
    } = useManageOrder({ mode });

    const lineTotal = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
    );

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            {/* Back nav */}
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
                        Customer &amp; Shipping Details
                    </h3>
                    <p className="text-xs text-pulse-green">
                        Fill in the customer information and shipping address
                        for this order
                    </p>
                </div>

                <FormBuilder<ManageOrderFormValues>
                    ref={formRef}
                    config={formConfig}
                    schema={ManageOrderSchema}
                    defaultValues={INITIAL_ORDER_VALUES}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-12 gap-4"
                    noValidate
                ></FormBuilder>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm font-semibold text-pulse-green-dark">
                            Order Items
                        </h3>
                        <p className="text-xs text-pulse-green">
                            Add the products included in this order
                        </p>
                    </div>
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={addItem}
                        disabled={isSubmitting}
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </Button>
                </div>

                {/* Column headers */}
                <div className="hidden sm:grid grid-cols-12 gap-3 px-1">
                    <span className="col-span-4 text-xss font-medium text-pulse-green uppercase tracking-widest">
                        Product
                    </span>
                    <span className="col-span-3 text-xss font-medium text-pulse-green uppercase tracking-widest">
                        SKU
                    </span>
                    <span className="col-span-2 text-xss font-medium text-pulse-green uppercase tracking-widest">
                        Qty
                    </span>
                    <span className="col-span-2 text-xss font-medium text-pulse-green uppercase tracking-widest">
                        Unit Price ($)
                    </span>
                    <span className="col-span-1" />
                </div>

                {/* Item rows */}
                <div className="flex flex-col gap-3">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-12 gap-3 items-end"
                        >
                            <div className="col-span-12 sm:col-span-4">
                                <Input
                                    label={idx === 0 ? "Product" : undefined}
                                    placeholder="Product name"
                                    value={item.productName}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "productName",
                                            e.target.value,
                                        )
                                    }
                                    disabled={isSubmitting}
                                    className="text-xs"
                                />
                            </div>
                            <div className="col-span-12 sm:col-span-3">
                                <Input
                                    label={idx === 0 ? "SKU" : undefined}
                                    placeholder="SKU (optional)"
                                    value={item.sku}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "sku",
                                            e.target.value,
                                        )
                                    }
                                    disabled={isSubmitting}
                                    className="text-xs"
                                />
                            </div>
                            <div className="col-span-5 sm:col-span-2">
                                <Input
                                    label={idx === 0 ? "Qty" : undefined}
                                    type="number"
                                    placeholder="1"
                                    value={String(item.quantity)}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "quantity",
                                            Math.max(
                                                1,
                                                parseInt(e.target.value, 10) ||
                                                    1,
                                            ),
                                        )
                                    }
                                    disabled={isSubmitting}
                                    className="text-xs"
                                    min={1}
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-2">
                                <Input
                                    label={
                                        idx === 0 ? "Unit Price ($)" : undefined
                                    }
                                    type="number"
                                    placeholder="0.00"
                                    value={String(item.unitPrice)}
                                    onChange={(e) =>
                                        updateItem(
                                            item.id,
                                            "unitPrice",
                                            parseFloat(e.target.value) || 0,
                                        )
                                    }
                                    disabled={isSubmitting}
                                    className="text-xs"
                                    min={0}
                                    step="0.01"
                                />
                            </div>
                            <div
                                className={cn(
                                    "col-span-1 flex items-end pb-1",
                                    idx === 0 && "pt-5",
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    disabled={
                                        items.length === 1 || isSubmitting
                                    }
                                    className="p-1.5 rounded-lg text-status-cancelled hover:bg-status-cancelled-bg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {itemErrors && (
                    <p className="text-xs text-status-cancelled">
                        {itemErrors}
                    </p>
                )}

                {/* Line total */}
                <div className="flex justify-end pt-3 border-t border-pulse-cream-dark">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-pulse-green">
                            Items Total
                        </span>
                        <span className="text-sm font-bold text-pulse-green-dark">
                            ${lineTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action footer */}
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
                    type="button"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={triggerSubmit}
                >
                    Create Order
                </Button>
            </div>
        </div>
    );
};

export default ManageOrder;
